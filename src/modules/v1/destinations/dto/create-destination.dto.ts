import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AncestorDto } from './ancestor.dto';
import { PhotoDto } from './photo.dto';

export class CreateDestinationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ type: [AncestorDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AncestorDto)
  ancestors: AncestorDto[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  best_months: string[];

  @ApiProperty()
  @IsInt()
  children_count: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  attractions: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kind: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: [PhotoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoDto)
  photos: PhotoDto[];

  @ApiProperty()
  @IsNumber()
  popularity: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  top_styles: string[];
}