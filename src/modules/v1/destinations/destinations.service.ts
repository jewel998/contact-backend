import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Destination, Prisma } from '../../../../generated/prisma';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createDestinationDto: CreateDestinationDto): Promise<Destination> {
    const { ancestors, photos, ...rest } = createDestinationDto;
    const data: Prisma.DestinationCreateInput = {
      ...rest,
      ancestors: ancestors as unknown as Prisma.JsonArray,
      photos: photos as unknown as Prisma.JsonArray,
    };
    return this.prisma.destination.create({ data });
  }

  async findAll(): Promise<Destination[]> {
    return this.prisma.destination.findMany();
  }

  async findOne(id: string): Promise<Destination | null> {
    return this.prisma.destination.findUnique({ where: { id } });
  }

  async update(id: string, updateDestinationDto: UpdateDestinationDto): Promise<Destination | null> {
    const { ancestors, photos, ...rest } = updateDestinationDto;
    const data: Prisma.DestinationUpdateInput = { ...rest };

    if (ancestors) {
      data.ancestors = ancestors as unknown as Prisma.JsonArray;
    }
    if (photos) {
      data.photos = photos as unknown as Prisma.JsonArray;
    }

    return this.prisma.destination.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Destination | null> {
    return this.prisma.destination.delete({ where: { id } });
  }
}