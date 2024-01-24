import { PrismaService } from './prisma.service';
/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
