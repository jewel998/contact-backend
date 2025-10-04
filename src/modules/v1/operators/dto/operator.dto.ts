import { ApiProperty } from '@nestjs/swagger';
import { AttributionDto } from './attribution.dto';
import { BrandDto } from './brand.dto';
import { LinksDto } from './links.dto';
import { ProfileDto } from './profile.dto';
import { RatingsDto } from './ratings.dto';

export class OperatorDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ type: [String] })
  aliases: string[];

  @ApiProperty({ type: AttributionDto })
  attribution: AttributionDto;

  @ApiProperty({ type: BrandDto })
  brand: BrandDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isPartner: boolean;

  @ApiProperty({ type: [String] })
  legalNames: string[];

  @ApiProperty({ type: LinksDto })
  links: LinksDto;

  @ApiProperty()
  name: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  verified: boolean;

  @ApiProperty({ required: false })
  ratingAvg?: number;

  @ApiProperty({ type: RatingsDto })
  ratings: RatingsDto;

  @ApiProperty({ type: ProfileDto })
  profile: ProfileDto;
}