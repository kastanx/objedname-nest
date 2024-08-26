import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Order } from './orders/order.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'orders.db',
  entities: [Order],
  synchronize: true,
};
