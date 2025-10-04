import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsMongoId,
  IsUrl,
  IsDateString,
  IsNumber,
  IsInt,
  IsOptional,
} from 'class-validator';

export class UpdateScheduleDto {
  @ApiProperty({ description: 'The ID of the trip this schedule belongs to.' })
  @IsOptional()
  @IsMongoId()
  tripId?: string;

  @ApiProperty({ description: 'The URL to the vendor\'s page for this schedule.' })
  @IsOptional()
  @IsUrl()
  vendorUrl?: string;

  @ApiProperty({ description: 'The end date of the schedule.' })
  @IsOptional()
  @IsDateString()
  end?: string;

  @ApiProperty({ description: 'The start date of the schedule.' })
  @IsOptional()
  @IsDateString()
  start?: string;

  @ApiProperty({ description: 'The currency of the price.' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ description: 'The month of the schedule.' })
  @IsOptional()
  @IsString()
  month?: string;

  @ApiProperty({ description: 'The price of the schedule.' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'The number of available seats.' })
  @IsOptional()
  @IsInt()
  seats?: number;

  @ApiProperty({ description: 'The status of the schedule.' })
  @IsOptional()
  @IsString()
  status?: string;
}