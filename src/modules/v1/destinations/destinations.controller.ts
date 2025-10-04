import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { Destination } from '../../../generated/prisma';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  async create(@Body() data: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>): Promise<Destination> {
    return this.destinationsService.create(data);
  }

  @Get()
  async findAll(): Promise<Destination[]> {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Destination | null> {
    return this.destinationsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Destination>): Promise<Destination | null> {
    return this.destinationsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Destination | null> {
    return this.destinationsService.remove(id);
  }
}