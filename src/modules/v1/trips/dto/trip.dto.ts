import { ApiProperty } from '@nestjs/swagger';
import { ContentDto } from './content.dto';
import { SourceDto } from './source.dto';

export class TripDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ type: ContentDto })
  content: ContentDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  currency: string;

  @ApiProperty({ type: [String] })
  destinations: string[];

  @ApiProperty()
  durationDays: number;

  @ApiProperty()
  isVerifiedOperator: boolean;

  @ApiProperty({ type: [String] })
  months: string[];

  @ApiProperty()
  nextStartDate: string;

  @ApiProperty()
  operatorId: string;

  @ApiProperty()
  priceFrom: number;

  @ApiProperty()
  primaryDestination: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ type: SourceDto })
  source: SourceDto;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  tripType: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  operatorName: string;

  @ApiProperty()
  startFrom: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  v: number;
}