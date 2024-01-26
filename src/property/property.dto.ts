import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class PropertyDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
}
