import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { Schedule } from '../../../generated/prisma';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() data: Omit<Schedule, 'id' | 'createdAt' | 'lastSeenAt'>): Promise<Schedule> {
    return this.schedulesService.create(data);
  }

  @Get()
  async findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Schedule | null> {
    return this.schedulesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Schedule>): Promise<Schedule | null> {
    return this.schedulesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Schedule | null> {
    return this.schedulesService.remove(id);
  }
}