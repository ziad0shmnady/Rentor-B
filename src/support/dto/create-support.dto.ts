import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateSupportDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  email: string;

  gender: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  type: string;

  @Type(() => Date)
  @IsDate()
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
