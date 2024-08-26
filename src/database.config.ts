import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Order } from './models/order.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'orders.db',
  entities: [Order], // Specify entities here
  synchronize: true,
};
