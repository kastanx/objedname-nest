import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrderResponseDto {
  @Expose()
  @ApiProperty({ description: 'The unique identifier of the order' })
  id: number;

  @Expose()
  @ApiProperty({ description: 'Description of the order' })
  description: string;

  @Expose()
  @ApiProperty({ description: 'Current status of the order' })
  status: string;

  @Expose()
  @ApiProperty({
    description: 'Indicates if the order is deleted',
    default: false,
  })
  deleted: boolean;
}
