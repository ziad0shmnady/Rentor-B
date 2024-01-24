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
  phone: string;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString()
  @IsNotEmpty()
  firstName: string | Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  lastName: string | Prisma.StringFieldUpdateOperationsInput;
  @IsEmail()
  @IsNotEmpty()
  email: string | Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  phone: string | Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  @IsNotEmpty()
  type: string | Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  @IsNotEmpty()
  password: string | Prisma.StringFieldUpdateOperationsInput;
}
