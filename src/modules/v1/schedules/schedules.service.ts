import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Schedule } from '../../../../generated/prisma';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.prisma.schedule.create({
      data: {
        ...createScheduleDto,
        lastSeenAt: new Date().toISOString(),
      },
    });
  }

  async findAll(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany();
  }

  async findOne(id: string): Promise<Schedule | null> {
    return this.prisma.schedule.findUnique({ where: { id } });
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<Schedule | null> {
    return this.prisma.schedule.update({
      where: { id },
      data: {
        ...updateScheduleDto,
        lastSeenAt: new Date().toISOString(),
      },
    });
  }

  async remove(id: string): Promise<Schedule | null> {
    return this.prisma.schedule.delete({ where: { id } });
  }
}