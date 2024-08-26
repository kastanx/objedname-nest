import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({
    status: 200,
    description: 'A list of orders',
    type: OrderResponseDto,
    isArray: true,
  })
  async findAll(): Promise<OrderResponseDto[]> {
    const order = await this.ordersService.findAll();

    return order.map((order) => plainToClass(OrderResponseDto, order));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific order by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the order' })
  @ApiResponse({
    status: 200,
    description: 'The found order',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('id') id: number): Promise<OrderResponseDto> {
    const order = await this.ordersService.findOne(id);

    return plainToClass(OrderResponseDto, order);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    const order = await this.ordersService.create(createOrderDto);

    return plainToClass(OrderResponseDto, order);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated order',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the order' })
  async update(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') id: number,
  ): Promise<OrderResponseDto> {
    const order = this.ordersService.update(id, updateOrderDto);

    return plainToClass(OrderResponseDto, order);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({
    status: 204,
    description: 'The order has been successfully deleted.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
