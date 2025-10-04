import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AncestorDto } from './ancestor.dto';
import { PhotoDto } from './photo.dto';

export class UpdateDestinationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ type: [AncestorDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AncestorDto)
  ancestors?: AncestorDto[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  best_months?: string[];

  @ApiProperty()
  @IsOptional()
  @IsInt()
  children_count?: number;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attractions?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  kind?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: [PhotoDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoDto)
  photos?: PhotoDto[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  popularity?: number;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  top_styles?: string[];
}
