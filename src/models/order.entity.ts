import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../orders/dto/create-order.dto';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ default: false })
  deleted: boolean;
}
