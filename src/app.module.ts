import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [OrdersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
