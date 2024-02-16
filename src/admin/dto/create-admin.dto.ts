import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsOptional()
  phone: string;
  @IsString()
  @IsOptional()
  birthdate: Date;
  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  @IsOptional()
  gender: string;
  @IsString()
  @IsOptional()
  type: string;
}
