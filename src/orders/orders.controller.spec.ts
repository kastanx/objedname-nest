import { NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JWT_SECRET } from '../auth/auth.service';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;
  let orderRepository: Repository<Order>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Order],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Order]),
        JwtModule.register({
          global: true,
          secret: JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    dataSource = module.get<DataSource>(DataSource);
  });

  beforeEach(async () => {
    await dataSource.synchronize(true);
  });

  describe('create', () => {
    it('should create an order and return it', async () => {
      const createOrderDto: CreateOrderDto = {
        description: 'New Order',
        status: OrderStatus.PENDING,
      };
      const result = await controller.create(createOrderDto);

      expect(result).toHaveProperty('id');
      expect(result.description).toBe(createOrderDto.description);
      expect(result.status).toBe(createOrderDto.status);
      expect(result.deleted).toBe(false);
    });

    it('should create an order with default status if not provided', async () => {
      const createOrderDto: CreateOrderDto = {
        description: 'New Order',
      };
      const result = await controller.create(createOrderDto);

      expect(result).toHaveProperty('id');
      expect(result.description).toBe(createOrderDto.description);
      expect(result.status).toBe(OrderStatus.PENDING);
      expect(result.deleted).toBe;
    });

    it('should throw an error if description is not provided', async () => {
      const createOrderDto: any = {};
      await expect(controller.create(createOrderDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      await orderRepository.save({
        description: 'Order 1',
        status: OrderStatus.PENDING,
      });
      await orderRepository.save({
        description: 'Order 2',
        status: OrderStatus.SHIPPED,
      });

      const result = await controller.findAll();
      expect(result).toHaveLength(2);
    });

    it('should return an empty array if no orders are found', async () => {
      const result = await controller.findAll();
      expect(result).toHaveLength(0);
    });

    it('should not return soft deleted orders', async () => {
      const createdOrder = await orderRepository.save({
        description: 'Order 1',
        status: OrderStatus.PENDING,
      });

      await controller.remove(createdOrder.id);
      const result = await controller.findAll();

      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return an order if found', async () => {
      const createdOrder = await orderRepository.save({
        description: 'Order 1',
        status: OrderStatus.PENDING,
      });
      const result = await controller.findOne(createdOrder.id);

      expect(result).toEqual(createdOrder);
    });

    it('should throw a NotFoundException if order not found', async () => {
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if order is soft deleted', async () => {
      const createdOrder = await orderRepository.save({
        description: 'Order 1',
        status: OrderStatus.PENDING,
      });

      await controller.remove(createdOrder.id);
      await expect(controller.findOne(createdOrder.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the order', async () => {
      const createdOrder = await orderRepository.save({
        description: 'Order 1',
        status: OrderStatus.PENDING,
      });
      const updateOrderDto: UpdateOrderDto = { status: OrderStatus.DELIVERED };

      const updatedOrder = await controller.update(
        updateOrderDto,
        createdOrder.id,
      );

      expect(updatedOrder.status).toBe(updateOrderDto.status);
      expect(updatedOrder.description).toBe(createdOrder.description);
    });

    it('should throw a NotFoundException if order not found for update', async () => {
      const updateOrderDto: UpdateOrderDto = { status: OrderStatus.CANCELLED };
      await expect(controller.update(updateOrderDto, 999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should mark the order as deleted', async () => {
      const createdOrder = await orderRepository.save({
        description: 'Order 1',
        status: OrderStatus.PENDING,
      });

      await controller.remove(createdOrder.id);
      const result = await orderRepository.findOne({
        where: { id: createdOrder.id },
      });

      expect(result.deleted).toBe(true);
    });
  });
});
