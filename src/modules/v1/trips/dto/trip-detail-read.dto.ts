import { ApiProperty } from '@nestjs/swagger';

export class TripDetailReadDto {
  @ApiProperty({ description: 'Unique identifier for the trip.' })
  id: string;

  @ApiProperty({ type: 'object', description: 'JSON object with detailed trip content.' })
  content: any;

  @ApiProperty({ type: [String], description: 'Array of destination IDs.' })
  destinations: string[];

  @ApiProperty({ description: 'Duration of the trip in days.' })
  durationDays: number;

  @ApiProperty({ type: 'object', description: 'JSON object with media details.' })
  media?: any;

  @ApiProperty({ type: 'object', description: 'JSON object with operator details.' })
  operator: any;

  @ApiProperty({ description: 'The ID of the primary destination.' })
  primaryDestination: string;

  @ApiProperty({ description: 'Unique slug for the trip.' })
  slug: string;

  @ApiProperty({ type: [String], description: 'Tags associated with the trip.' })
  tags: string[];

  @ApiProperty({ description: 'Title of the trip.' })
  title: string;

  @ApiProperty({ description: 'Type of the trip.' })
  tripType: string;

  @ApiProperty({ description: 'The last update date of the trip.' })
  updatedAt: Date;

  @ApiProperty({ description: 'Starting point of the trip.' })
  startFrom: string;

  @ApiProperty({ description: 'Theme of the trip.' })
  theme: string;
}