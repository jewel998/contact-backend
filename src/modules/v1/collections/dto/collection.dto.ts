import { ApiProperty } from '@nestjs/swagger';
import { CollectionContentDto } from './collection-content.dto';

export class CollectionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  subtitle?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ type: CollectionContentDto, required: false })
  content?: CollectionContentDto;

  @ApiProperty({ type: [String] })
  tripIds: string[];

  @ApiProperty()
  type: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}