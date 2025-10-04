import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { Collection, Prisma } from 'generated/prisma';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(
    createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    const { content, ...rest } = createCollectionDto;
    const data: Prisma.CollectionCreateInput = {
      ...rest,
      content: content || Prisma.JsonNull,
    };
    return this.prisma.collection.create({ data });
  }

  async findAll(): Promise<Collection[]> {
    return this.prisma.collection.findMany();
  }

  async findOne(id: string): Promise<Collection | null> {
    return this.prisma.collection.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection | null> {
    const { content, ...rest } = updateCollectionDto;
    const data: Prisma.CollectionUpdateInput = { ...rest };
    if (updateCollectionDto.hasOwnProperty('content')) {
      data.content = content || Prisma.JsonNull;
    }
    return this.prisma.collection.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Collection | null> {
    return this.prisma.collection.delete({ where: { id } });
  }
}