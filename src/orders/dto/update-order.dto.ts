import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from './create-order.dto';

export class UpdateOrderDto {
  @ApiProperty({ description: 'Description of the order' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Current status of the order',
    enum: OrderStatus,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
