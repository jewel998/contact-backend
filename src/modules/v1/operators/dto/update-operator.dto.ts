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
  @ApiProperty()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aliases?: string[];

  @ApiProperty({ type: AttributionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AttributionDto)
  attribution?: AttributionDto;

  @ApiProperty({ type: BrandDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => BrandDto)
  brand?: BrandDto;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPartner?: boolean;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  legalNames?: string[];

  @ApiProperty({ type: LinksDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LinksDto)
  links?: LinksDto;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @ApiProperty({ type: RatingsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RatingsDto)
  ratings?: RatingsDto;

  @ApiProperty({ type: ProfileDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile?: ProfileDto;
}