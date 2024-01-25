import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  gender: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  birthdate: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString()
  @IsOptional()
  firstName: Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  lastName: Prisma.StringFieldUpdateOperationsInput;
  @IsEmail()
  @IsOptional()
  email: Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  @IsOptional()
  gender: Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  @IsOptional()
  phone: Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  @IsOptional()
  address: Prisma.StringFieldUpdateOperationsInput;
  @IsOptional()
  birthdate: Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  @IsOptional()
  password: Prisma.StringFieldUpdateOperationsInput;
}
