import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CollectionContentDto } from './collection-content.dto';

export class CreateCollectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: CollectionContentDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CollectionContentDto)
  content?: CollectionContentDto;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tripIds: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;
}