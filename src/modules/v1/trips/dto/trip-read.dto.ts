import { ApiProperty } from '@nestjs/swagger';

export class TripReadDto {
  @ApiProperty({ example: '60d21b4667d0d8992e610c87', description: 'Unique identifier for the trip.' })
  id: string;

  @ApiProperty({ example: true, description: 'Indicates if the trip is active.' })
  active: boolean;

  @ApiProperty({ type: [String], example: ['60d21b4667d0d8992e610c85'], description: 'Array of destination IDs.' })
  destinations: string[];

  @ApiProperty({ example: 10, description: 'Duration of the trip in days.' })
  durationDays: number;

  @ApiProperty({ example: 1200.0, description: 'Minimum price of the trip.' })
  minPrice: number;

  @ApiProperty({ type: [String], example: ['June', 'July'], description: 'Months when the trip is available.' })
  months: string[];

  @ApiProperty({ example: '2025-06-01', description: 'The next start date of the trip.' })
  nextStartDate: string;

  @ApiProperty({ type: 'object', example: { "name": "Amazing Operator" }, description: 'JSON object with operator details.' })
  operator: any;

  @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'The ID of the primary destination.' })
  primaryDestination: string;

  @ApiProperty({ example: 'amazing-safari-in-africa', description: 'Unique slug for the trip.' })
  slug: string;

  @ApiProperty({ type: [String], example: ['safari', 'adventure'], description: 'Tags associated with the trip.' })
  tags: string[];

  @ApiProperty({ example: 'Amazing Safari in Africa', description: 'Title of the trip.' })
  title: string;

  @ApiProperty({ example: 'Adventure', description: 'Type of the trip.' })
  tripType: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'The last update date of the trip.' })
  updatedAt: Date;

  @ApiProperty({ example: 'Nairobi', description: 'Starting point of the trip.' })
  startFrom: string;

  @ApiProperty({ example: 'Wildlife', description: 'Theme of the trip.' })
  theme: string;
}