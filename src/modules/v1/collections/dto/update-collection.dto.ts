import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CollectionContentDto } from './collection-content.dto';

export class UpdateCollectionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: CollectionContentDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CollectionContentDto)
  content?: CollectionContentDto;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tripIds?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string;
}
