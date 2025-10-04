import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsMongoId,
  IsUrl,
  IsDateString,
  IsNumber,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({ description: 'The ID of the trip this schedule belongs to.' })
  @IsMongoId()
  @IsNotEmpty()
  tripId: string;

  @ApiProperty({
    description: "The URL to the vendor's page for this schedule.",
  })
  @IsUrl()
  @IsNotEmpty()
  vendorUrl: string;

  @ApiProperty({ description: 'The end date of the schedule.' })
  @IsDateString()
  @IsNotEmpty()
  end: string;

  @ApiProperty({ description: 'The start date of the schedule.' })
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({ description: 'The currency of the price.' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ description: 'The month of the schedule.' })
  @IsString()
  @IsNotEmpty()
  month: string;

  @ApiProperty({ description: 'The price of the schedule.' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The number of available seats.' })
  @IsOptional()
  @IsInt()
  seats?: number;

  @ApiProperty({ description: 'The status of the schedule.' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
