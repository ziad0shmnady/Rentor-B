import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OwnerModule } from './owner/owner.module';
import { PropertyModule } from './property/property.module';
import { AdminModule } from './admin/admin.module';
import { SupportModule } from './support/support.module';
import { SwitchProfileMiddleware } from './owner/owner.middleware';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    OwnerModule,
    PropertyModule,
    AdminModule,
    SupportModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SwitchProfileMiddleware)
      .forRoutes('owner/ownerProfile', 'user/userProfile');
  }
}
