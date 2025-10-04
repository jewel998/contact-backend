import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { Operator, OperatorRead, OperatorDetailRead } from '../../../generated/prisma';

@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Post()
  async create(@Body() data: Omit<Operator, 'id' | 'createdAt' | 'updatedAt'>): Promise<Operator> {
    return this.operatorsService.create(data);
  }

  @Get()
  async findAll(): Promise<OperatorRead[]> {
    return this.operatorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OperatorDetailRead | null> {
    return this.operatorsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Operator>): Promise<Operator | null> {
    return this.operatorsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Operator | null> {
    return this.operatorsService.remove(id);
  }
}