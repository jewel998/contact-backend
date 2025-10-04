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
  @ApiProperty({ description: 'Indicates if the trip is active.' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    type: ContentDto,
    description: 'JSON object with trip content.',
  })
  @ValidateNested()
  @Type(() => ContentDto)
  content: ContentDto;

  @ApiProperty({ description: 'Currency of the trip price.' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ type: [String], description: 'Array of destination IDs.' })
  @IsArray()
  @IsString({ each: true })
  destinations: string[];

  @ApiProperty({ description: 'Duration of the trip in days.' })
  @IsInt()
  durationDays: number;

  @ApiProperty({ description: 'Indicates if the operator is verified.' })
  @IsBoolean()
  isVerifiedOperator: boolean;

  @ApiProperty({
    type: [String],
    description: 'Months when the trip is available.',
  })
  @IsArray()
  @IsString({ each: true })
  months: string[];

  @ApiProperty({ description: 'The next start date of the trip.' })
  @IsString()
  @IsNotEmpty()
  nextStartDate: string;

  @ApiProperty({ description: 'The ID of the operator.' })
  @IsString()
  @IsNotEmpty()
  operatorId: string;

  @ApiProperty({ description: 'Starting price of the trip.' })
  @IsNumber()
  priceFrom: number;

  @ApiProperty({ description: 'The ID of the primary destination.' })
  @IsString()
  @IsNotEmpty()
  primaryDestination: string;

  @ApiProperty({ description: 'Unique slug for the trip.' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    type: SourceDto,
    description: 'JSON object with source information.',
  })
  @ValidateNested()
  @Type(() => SourceDto)
  source: SourceDto;

  @ApiProperty({
    type: [String],
    description: 'Tags associated with the trip.',
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ description: 'Title of the trip.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Type of the trip.' })
  @IsString()
  @IsNotEmpty()
  tripType: string;

  @ApiProperty({ description: 'Name of the operator.' })
  @IsString()
  @IsNotEmpty()
  operatorName: string;

  @ApiProperty({ description: 'Starting point of the trip.' })
  @IsString()
  @IsNotEmpty()
  startFrom: string;

  @ApiProperty({ description: 'Theme of the trip.' })
  @IsString()
  @IsNotEmpty()
  theme: string;

  @ApiProperty({ description: 'Version number.' })
  @IsInt()
  v: number;
}
