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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from '../../../generated/prisma';

@ApiTags('Schedules')
@Controller('v1/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiResponse({
    status: 201,
    description: 'The schedule has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules' })
  @ApiResponse({
    status: 200,
    description: 'A list of schedules.',
    type: [Schedule],
  })
  async findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a schedule by ID' })
  @ApiResponse({
    status: 200,
    description: 'The schedule details.',
    type: Schedule,
  })
  @ApiResponse({ status: 404, description: 'Schedule not found.' })
  async findOne(@Param('id') id: string): Promise<Schedule | null> {
    return this.schedulesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a schedule' })
  @ApiResponse({
    status: 200,
    description: 'The schedule has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Schedule not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule | null> {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a schedule' })
  @ApiResponse({
    status: 200,
    description: 'The schedule has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Schedule not found.' })
  async remove(@Param('id') id: string): Promise<Schedule | null> {
    return this.schedulesService.remove(id);
  }
}
