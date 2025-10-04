import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AttributionDto } from './attribution.dto';
import { BrandDto } from './brand.dto';
import { LinksDto } from './links.dto';
import { RatingsDto } from './ratings.dto';
import { ProfileDto } from './profile.dto';

export class UpdateOperatorDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aliases?: string[];

  @ApiProperty({ type: AttributionDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AttributionDto)
  attribution?: AttributionDto;

  @ApiProperty({ type: BrandDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => BrandDto)
  brand?: BrandDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isPartner?: boolean;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  legalNames?: string[];

  @ApiProperty({ type: LinksDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LinksDto)
  links?: LinksDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @ApiProperty({ type: RatingsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => RatingsDto)
  ratings?: RatingsDto;

  @ApiProperty({ type: ProfileDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile?: ProfileDto;
}