import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Schedule } from '../../../../generated/prisma';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: Omit<Schedule, 'id' | 'createdAt' | 'lastSeenAt'>): Promise<Schedule> {
    return this.prisma.schedule.create({
      data: {
        ...data,
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

  async update(id: string, data: Partial<Schedule>): Promise<Schedule | null> {
    return this.prisma.schedule.update({
      where: { id },
      data: {
        ...data,
        lastSeenAt: new Date().toISOString(),
      },
    });
  }

  async remove(id: string): Promise<Schedule | null> {
    return this.prisma.schedule.delete({ where: { id } });
  }
}