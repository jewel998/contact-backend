import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection, CollectionRead, CollectionDetailRead } from '../../../generated/prisma';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  async create(@Body() data: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>): Promise<Collection> {
    return this.collectionsService.create(data);
  }

  @Get()
  async findAll(): Promise<CollectionRead[]> {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CollectionDetailRead | null> {
    return this.collectionsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Collection>): Promise<Collection | null> {
    return this.collectionsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Collection | null> {
    return this.collectionsService.remove(id);
  }
}