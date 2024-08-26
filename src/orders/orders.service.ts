import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../models/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepository.find({ where: { deleted: false } });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id, deleted: false },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id, deleted: false },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.orderRepository.save({ ...order, ...updateOrderDto });
  }

  async remove(id: number) {
    await this.orderRepository.update({ id }, { deleted: true });
  }
}
