import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination } from '../../../generated/prisma';

@ApiTags('Destinations')
@Controller('v1/destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new destination' })
  @ApiResponse({ status: 201, description: 'The destination has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createDestinationDto: CreateDestinationDto): Promise<Destination> {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all destinations' })
  @ApiResponse({ status: 200, description: 'A list of destinations.', type: [Destination] })
  async findAll(): Promise<Destination[]> {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a destination by ID' })
  @ApiResponse({ status: 200, description: 'The destination details.', type: Destination })
  @ApiResponse({ status: 404, description: 'Destination not found.' })
  async findOne(@Param('id') id: string): Promise<Destination | null> {
    return this.destinationsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a destination' })
  @ApiResponse({ status: 200, description: 'The destination has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Destination not found.' })
  async update(@Param('id') id: string, @Body() updateDestinationDto: UpdateDestinationDto): Promise<Destination | null> {
    return this.destinationsService.update(id, updateDestinationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a destination' })
  @ApiResponse({ status: 200, description: 'The destination has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Destination not found.' })
  async remove(@Param('id') id: string): Promise<Destination | null> {
    return this.destinationsService.remove(id);
  }
}