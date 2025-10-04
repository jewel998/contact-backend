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
  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @ApiProperty({ type: ContentDto })
  @ValidateNested()
  @Type(() => ContentDto)
  content: ContentDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  destinations: string[];

  @ApiProperty()
  @IsInt()
  durationDays: number;

  @ApiProperty()
  @IsBoolean()
  isVerifiedOperator: boolean;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  months: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nextStartDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  operatorId: string;

  @ApiProperty()
  @IsNumber()
  priceFrom: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  primaryDestination: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ type: SourceDto })
  @ValidateNested()
  @Type(() => SourceDto)
  source: SourceDto;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tripType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  operatorName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startFrom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  theme: string;

  @ApiProperty()
  @IsInt()
  v: number;
}