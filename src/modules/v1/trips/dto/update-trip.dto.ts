import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentDto } from './content.dto';
import { SourceDto } from './source.dto';

export class UpdateTripDto {
  @ApiProperty({ example: true, description: 'Indicates if the trip is active.', required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ type: ContentDto, description: 'JSON object with trip content.', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContentDto)
  content?: ContentDto;

  @ApiProperty({ example: 'USD', description: 'Currency of the trip price.', required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ type: [String], example: ['60d21b4667d0d8992e610c85'], description: 'Array of destination IDs.', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destinations?: string[];

  @ApiProperty({ example: 10, description: 'Duration of the trip in days.', required: false })
  @IsOptional()
  @IsInt()
  durationDays?: number;

  @ApiProperty({ example: true, description: 'Indicates if the operator is verified.', required: false })
  @IsOptional()
  @IsBoolean()
  isVerifiedOperator?: boolean;

  @ApiProperty({ type: [String], example: ['June', 'July'], description: 'Months when the trip is available.', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  months?: string[];

  @ApiProperty({ example: '2025-06-01', description: 'The next start date of the trip.', required: false })
  @IsOptional()
  @IsString()
  nextStartDate?: string;

  @ApiProperty({ example: '60d21b4667d0d8992e610c86', description: 'The ID of the operator.', required: false })
  @IsOptional()
  @IsString()
  operatorId?: string;

  @ApiProperty({ example: 1500.0, description: 'Starting price of the trip.', required: false })
  @IsOptional()
  @IsNumber()
  priceFrom?: number;

  @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'The ID of the primary destination.', required: false })
  @IsOptional()
  @IsString()
  primaryDestination?: string;

  @ApiProperty({ example: 'amazing-safari-in-africa', description: 'Unique slug for the trip.', required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ type: SourceDto, description: 'JSON object with source information.', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => SourceDto)
  source?: SourceDto;

  @ApiProperty({ type: [String], example: ['safari', 'adventure'], description: 'Tags associated with the trip.', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: 'Amazing Safari in Africa', description: 'Title of the trip.', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Adventure', description: 'Type of the trip.', required: false })
  @IsOptional()
  @IsString()
  tripType?: string;

  @ApiProperty({ example: 'Amazing Operator', description: 'Name of the operator.', required: false })
  @IsOptional()
  @IsString()
  operatorName?: string;

  @ApiProperty({ example: 'Nairobi', description: 'Starting point of the trip.', required: false })
  @IsOptional()
  @IsString()
  startFrom?: string;

  @ApiProperty({ example: 'Wildlife', description: 'Theme of the trip.', required: false })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiProperty({ example: 1, description: 'Version number.', required: false })
  @IsOptional()
  @IsInt()
  v?: number;
}