import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip, TripRead, TripDetailRead } from '../../../generated/prisma';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async create(@Body() data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
    return this.tripsService.create(data);
  }

  @Get()
  async findAll(): Promise<TripRead[]> {
    return this.tripsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TripDetailRead | null> {
    return this.tripsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Trip>): Promise<Trip | null> {
    return this.tripsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Trip | null> {
    return this.tripsService.remove(id);
  }
}