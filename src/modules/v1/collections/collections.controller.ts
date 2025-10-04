import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection, CollectionRead, CollectionDetailRead } from '../../../generated/prisma';

@ApiTags('Collections')
@Controller('v1/collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new collection' })
  @ApiResponse({ status: 201, description: 'The collection has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createCollectionDto: CreateCollectionDto): Promise<Collection> {
    return this.collectionsService.create(createCollectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all collections' })
  @ApiResponse({ status: 200, description: 'A list of collections.', type: [CollectionRead] })
  async findAll(): Promise<CollectionRead[]> {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a collection by ID' })
  @ApiResponse({ status: 200, description: 'The collection details.', type: CollectionDetailRead })
  @ApiResponse({ status: 404, description: 'Collection not found.' })
  async findOne(@Param('id') id: string): Promise<CollectionDetailRead | null> {
    return this.collectionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a collection' })
  @ApiResponse({ status: 200, description: 'The collection has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Collection not found.' })
  async update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto): Promise<Collection | null> {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a collection' })
  @ApiResponse({ status: 200, description: 'The collection has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Collection not found.' })
  async remove(@Param('id') id: string): Promise<Collection | null> {
    return this.collectionsService.remove(id);
  }
}