import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from 'generated/prisma';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return this.prisma.trip.create({ data: createTripDto });
  }

  async findAll(): Promise<Trip[]> {
    return this.prisma.trip.findMany();
  }

  async findOne(id: string): Promise<Trip | null> {
    return this.prisma.trip.findUnique({ where: { id } });
  }

  async update(id: string, updateTripDto: UpdateTripDto): Promise<Trip | null> {
    return this.prisma.trip.update({
      where: { id },
      data: updateTripDto,
    });
  }

  async remove(id: string): Promise<Trip | null> {
    return this.prisma.trip.delete({ where: { id } });
  }
}