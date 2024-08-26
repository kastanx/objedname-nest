import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Description of the order' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Current status of the order',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
