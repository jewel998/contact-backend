import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString,
  IsArray,
  IsInt,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentDto } from './content.dto';
import { SourceDto } from './source.dto';

export class CreateTripDto {
  @ApiProperty({ example: true, description: 'Indicates if the trip is active.' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ type: ContentDto, description: 'JSON object with trip content.' })
  @ValidateNested()
  @Type(() => ContentDto)
  content: ContentDto;

  @ApiProperty({ example: 'USD', description: 'Currency of the trip price.' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ type: [String], example: ['60d21b4667d0d8992e610c85'], description: 'Array of destination IDs.' })
  @IsArray()
  @IsString({ each: true })
  destinations: string[];

  @ApiProperty({ example: 10, description: 'Duration of the trip in days.' })
  @IsInt()
  durationDays: number;

  @ApiProperty({ example: true, description: 'Indicates if the operator is verified.' })
  @IsBoolean()
  isVerifiedOperator: boolean;

  @ApiProperty({ type: [String], example: ['June', 'July'], description: 'Months when the trip is available.' })
  @IsArray()
  @IsString({ each: true })
  months: string[];

  @ApiProperty({ example: '2025-06-01', description: 'The next start date of the trip.' })
  @IsString()
  @IsNotEmpty()
  nextStartDate: string;

  @ApiProperty({ example: '60d21b4667d0d8992e610c86', description: 'The ID of the operator.' })
  @IsString()
  @IsNotEmpty()
  operatorId: string;

  @ApiProperty({ example: 1500.0, description: 'Starting price of the trip.' })
  @IsNumber()
  priceFrom: number;

  @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'The ID of the primary destination.' })
  @IsString()
  @IsNotEmpty()
  primaryDestination: string;

  @ApiProperty({ example: 'amazing-safari-in-africa', description: 'Unique slug for the trip.' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ type: SourceDto, description: 'JSON object with source information.' })
  @ValidateNested()
  @Type(() => SourceDto)
  source: SourceDto;

  @ApiProperty({ type: [String], example: ['safari', 'adventure'], description: 'Tags associated with the trip.' })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ example: 'Amazing Safari in Africa', description: 'Title of the trip.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Adventure', description: 'Type of the trip.' })
  @IsString()
  @IsNotEmpty()
  tripType: string;

  @ApiProperty({ example: 'Amazing Operator', description: 'Name of the operator.' })
  @IsString()
  @IsNotEmpty()
  operatorName: string;

  @ApiProperty({ example: 'Nairobi', description: 'Starting point of the trip.' })
  @IsString()
  @IsNotEmpty()
  startFrom: string;

  @ApiProperty({ example: 'Wildlife', description: 'Theme of the trip.' })
  @IsString()
  @IsNotEmpty()
  theme: string;

  @ApiProperty({ example: 1, description: 'Version number.' })
  @IsInt()
  v: number;
}