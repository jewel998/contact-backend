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
import { AttributionDto } from './attribution.dto';
import { BrandDto } from './brand.dto';
import { LinksDto } from './links.dto';
import { RatingsDto } from './ratings.dto';
import { ProfileDto } from './profile.dto';

export class CreateOperatorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

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
  @ValidateNested()
  @Type(() => AttributionDto)
  attribution: AttributionDto;

  @ApiProperty({ type: BrandDto })
  @ValidateNested()
  @Type(() => BrandDto)
  brand: BrandDto;

  @ApiProperty()
  @IsBoolean()
  isPartner: boolean;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  legalNames: string[];

  @ApiProperty({ type: LinksDto })
  @ValidateNested()
  @Type(() => LinksDto)
  links: LinksDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsBoolean()
  verified: boolean;

  @ApiProperty({ type: RatingsDto })
  @ValidateNested()
  @Type(() => RatingsDto)
  ratings: RatingsDto;

  @ApiProperty({ type: ProfileDto })
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
