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
  @ApiProperty({ description: 'The ID of the trip this schedule belongs to.', required: false })
  @IsOptional()
  @IsMongoId()
  tripId?: string;

  @ApiProperty({ description: 'The URL to the vendor\'s page for this schedule.', required: false })
  @IsOptional()
  @IsUrl()
  vendorUrl?: string;

  @ApiProperty({ description: 'The end date of the schedule.', required: false })
  @IsOptional()
  @IsDateString()
  end?: string;

  @ApiProperty({ description: 'The start date of the schedule.', required: false })
  @IsOptional()
  @IsDateString()
  start?: string;

  @ApiProperty({ description: 'The currency of the price.', required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ description: 'The month of the schedule.', required: false })
  @IsOptional()
  @IsString()
  month?: string;

  @ApiProperty({ description: 'The price of the schedule.', required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'The number of available seats.', required: false })
  @IsOptional()
  @IsInt()
  seats?: number;

  @ApiProperty({ description: 'The status of the schedule.', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}