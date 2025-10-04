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
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ type: ContentDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContentDto)
  content?: ContentDto;

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destinations?: string[];

  @ApiProperty()
  @IsOptional()
  @IsInt()
  durationDays?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isVerifiedOperator?: boolean;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  months?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  nextStartDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  operatorId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  priceFrom?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  primaryDestination?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ type: SourceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SourceDto)
  source?: SourceDto;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tripType?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  operatorName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  startFrom?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  v?: number;
}