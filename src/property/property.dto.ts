import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class LocationDto {
  // Assuming Location is an object with latitude and longitude properties
  @IsOptional()
  @ValidateNested()
  @Type(() => Number)
  latitude: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Number)
  longitude: number;
}

class CreatePropertyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBoolean()
  IsAvailable?: boolean = true;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  GrossM2?: string;

  @IsOptional()
  @IsString()
  netM2?: string;

  @IsOptional()
  @IsString()
  num_rooms?: string;

  @IsOptional()
  @IsString()
  num_living_rooms?: string;

  @IsOptional()
  @IsString()
  warming_type?: string;

  @IsOptional()
  @IsString()
  building_age?: string;

  @IsOptional()
  @IsString()
  floor_location?: string;

  @IsOptional()
  @IsString()
  street_address?: string;

  @IsOptional()
  @IsString()
  rental_income?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;
  @IsOptional()
  @IsDateString()
  createdAt: Date;
  @IsOptional()
  @IsDateString()
  updatedAt: Date;
  @IsOptional()
  @IsUUID()
  ownerId?: string;
}

export { CreatePropertyDto, LocationDto };
