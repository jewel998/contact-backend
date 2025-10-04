import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripDto } from './dto/trip.dto';
import { Trip } from 'generated/prisma';

@ApiTags('Trips')
@Controller('v1/trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({
    status: 201,
    description: 'The trip has been successfully created.',
    type: TripDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trips' })
  @ApiResponse({
    status: 200,
    description: 'A list of trips.',
    type: [TripDto],
  })
  async findAll(): Promise<Trip[]> {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a trip by ID' })
  @ApiResponse({
    status: 200,
    description: 'The trip details.',
    type: TripDto,
  })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  async findOne(@Param('id') id: string): Promise<Trip | null> {
    return this.tripsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a trip' })
  @ApiResponse({
    status: 200,
    description: 'The trip has been successfully updated.',
    type: TripDto,
  })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<Trip | null> {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip' })
  @ApiResponse({
    status: 200,
    description: 'The trip has been successfully deleted.',
    type: TripDto,
  })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  async remove(@Param('id') id: string): Promise<Trip | null> {
    return this.tripsService.remove(id);
  }
}