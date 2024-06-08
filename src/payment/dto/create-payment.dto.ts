import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  amount_cents: string;
}
