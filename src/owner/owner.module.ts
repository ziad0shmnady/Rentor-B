import { MiddlewareConsumer, Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { SwitchProfileMiddleware } from './owner.middleware';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
