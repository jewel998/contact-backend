import { ApiProperty } from '@nestjs/swagger';

export class TripDto {
  @ApiProperty({ description: 'Unique identifier for the trip.' })
  id: string;

  @ApiProperty({ description: 'Indicates if the trip is active.' })
  active: boolean;

  @ApiProperty({
    type: 'object',
    description: 'JSON object with trip content.',
  })
  content: any;

  @ApiProperty({ description: 'The creation date of the trip.' })
  createdAt: Date;

  @ApiProperty({ description: 'Currency of the trip price.' })
  currency: string;

  @ApiProperty({ type: [String], description: 'Array of destination IDs.' })
  destinations: string[];

  @ApiProperty({ description: 'Duration of the trip in days.' })
  durationDays: number;

  @ApiProperty({ description: 'Indicates if the operator is verified.' })
  isVerifiedOperator: boolean;

  @ApiProperty({
    type: [String],
    description: 'Months when the trip is available.',
  })
  months: string[];

  @ApiProperty({ description: 'The next start date of the trip.' })
  nextStartDate: string;

  @ApiProperty({ description: 'The ID of the operator.' })
  operatorId: string;

  @ApiProperty({ description: 'Starting price of the trip.' })
  priceFrom: number;

  @ApiProperty({ description: 'The ID of the primary destination.' })
  primaryDestination: string;

  @ApiProperty({ description: 'Unique slug for the trip.' })
  slug: string;

  @ApiProperty({
    type: 'object',
    description: 'JSON object with source information.',
  })
  source: any;

  @ApiProperty({
    type: [String],
    description: 'Tags associated with the trip.',
  })
  tags: string[];

  @ApiProperty({ description: 'Title of the trip.' })
  title: string;

  @ApiProperty({ description: 'Type of the trip.' })
  tripType: string;

  @ApiProperty({ description: 'The last update date of the trip.' })
  updatedAt: Date;

  @ApiProperty({ description: 'Name of the operator.' })
  operatorName: string;

  @ApiProperty({ description: 'Starting point of the trip.' })
  startFrom: string;

  @ApiProperty({ description: 'Theme of the trip.' })
  theme: string;

  @ApiProperty({ description: 'Version number.' })
  v: number;
}
