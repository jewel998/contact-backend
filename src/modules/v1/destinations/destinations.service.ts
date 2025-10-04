import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Destination } from '../../../../generated/prisma';

@Injectable()
export class DestinationsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>): Promise<Destination> {
    return this.prisma.destination.create({ data });
  }

  async findAll(): Promise<Destination[]> {
    return this.prisma.destination.findMany();
  }

  async findOne(id: string): Promise<Destination | null> {
    return this.prisma.destination.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Destination>): Promise<Destination | null> {
    return this.prisma.destination.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Destination | null> {
    return this.prisma.destination.delete({ where: { id } });
  }
}