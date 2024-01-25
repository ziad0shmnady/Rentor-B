import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class OwnerDto {
  @IsString()
  @IsNotEmpty()
  about: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
}

// update owner profile
export class UpdateOwnerDto implements Prisma.OwnerUpdateInput {
  @IsString()
  @IsNotEmpty()
  about: string;
}
