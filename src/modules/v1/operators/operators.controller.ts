import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OperatorsService } from './operators.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator, OperatorRead, OperatorDetailRead } from '../../../generated/prisma';

@ApiTags('Operators')
@Controller('v1/operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new operator' })
  @ApiResponse({ status: 201, description: 'The operator has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createOperatorDto: CreateOperatorDto): Promise<Operator> {
    return this.operatorsService.create(createOperatorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all operators' })
  @ApiResponse({ status: 200, description: 'A list of operators.', type: [OperatorRead] })
  async findAll(): Promise<OperatorRead[]> {
    return this.operatorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an operator by ID' })
  @ApiResponse({ status: 200, description: 'The operator details.', type: OperatorDetailRead })
  @ApiResponse({ status: 404, description: 'Operator not found.' })
  async findOne(@Param('id') id: string): Promise<OperatorDetailRead | null> {
    return this.operatorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an operator' })
  @ApiResponse({ status: 200, description: 'The operator has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Operator not found.' })
  async update(@Param('id') id: string, @Body() updateOperatorDto: UpdateOperatorDto): Promise<Operator | null> {
    return this.operatorsService.update(id, updateOperatorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an operator' })
  @ApiResponse({ status: 200, description: 'The operator has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Operator not found.' })
  async remove(@Param('id') id: string): Promise<Operator | null> {
    return this.operatorsService.remove(id);
  }
}