import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Collection, CollectionRead, CollectionDetailRead, Prisma } from '../../../../generated/prisma';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    return this.prisma.$transaction(async (prisma) => {
      const { content, ...rest } = createCollectionDto;
      const data: Prisma.CollectionCreateInput = {
        ...rest,
        content: content || Prisma.JsonNull,
      };
      const collection = await prisma.collection.create({ data });
      const { id, slug, active, title, tripIds, type, description, subtitle } = collection;

      const trips = await prisma.trip.findMany({
        where: { id: { in: tripIds } },
      });

      const prices = trips.map((t) => t.priceFrom).filter((p) => p != null);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
      const startDates = trips.map((t) => t.nextStartDate).filter((d) => d != null).sort();
      const nextStartDate = startDates.length > 0 ? startDates[0] : '';
      const durations = trips.map((t) => t.durationDays);
      const avgDuration = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;

      await prisma.collectionRead.create({
        data: {
          id,
          slug,
          active,
          title,
          tripIds,
          type,
          minPrice,
          avgPrice,
          nextStartDate,
          stats: { count: trips.length },
        },
      });

      const stats = {
        trips: trips.length,
        avgPrice,
        avgDuration,
      };
      const baseContent =
        collection.content &&
        typeof collection.content === 'object' &&
        !Array.isArray(collection.content)
          ? collection.content
          : {};

      await prisma.collectionDetailRead.create({
        data: {
          id,
          slug,
          title,
          subtitle,
          description: description || '',
          tripIds,
          content: { ...baseContent, stats },
        },
      });

      return collection;
    });
  }

  async findAll(): Promise<CollectionRead[]> {
    return this.prisma.collectionRead.findMany();
  }

  async findOne(id: string): Promise<CollectionDetailRead | null> {
    return this.prisma.collectionDetailRead.findUnique({ where: { id } });
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto): Promise<Collection | null> {
    return this.prisma.$transaction(async (prisma) => {
      const { content, ...rest } = updateCollectionDto;
      const data: Prisma.CollectionUpdateInput = { ...rest };
      if (updateCollectionDto.hasOwnProperty('content')) {
        data.content = content || Prisma.JsonNull;
      }

      const updatedCollection = await prisma.collection.update({
        where: { id },
        data,
      });

      const { slug, active, title, tripIds, type, description, subtitle } = updatedCollection;

      const trips = await prisma.trip.findMany({
        where: { id: { in: tripIds } },
      });

      const prices = trips.map((t) => t.priceFrom).filter((p) => p != null);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
      const startDates = trips.map((t) => t.nextStartDate).filter((d) => d != null).sort();
      const nextStartDate = startDates.length > 0 ? startDates[0] : '';
      const durations = trips.map((t) => t.durationDays);
      const avgDuration = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;

      await prisma.collectionRead.update({
        where: { id },
        data: {
          slug,
          active,
          title,
          tripIds,
          type,
          minPrice,
          avgPrice,
          nextStartDate,
          stats: { count: trips.length },
        },
      });

      const stats = {
        trips: trips.length,
        avgPrice,
        avgDuration,
      };
      const baseContent =
        updatedCollection.content &&
        typeof updatedCollection.content === 'object' &&
        !Array.isArray(updatedCollection.content)
          ? updatedCollection.content
          : {};

      await prisma.collectionDetailRead.update({
        where: { id },
        data: {
          slug,
          title,
          subtitle,
          description: description || '',
          tripIds,
          content: { ...baseContent, stats },
        },
      });

      return updatedCollection;
    });
  }

  async remove(id: string): Promise<Collection | null> {
    return this.prisma.$transaction(async (prisma) => {
      const collection = await prisma.collection.findUnique({ where: { id } });
      if (!collection) return null;

      await prisma.collectionRead.delete({ where: { id } });
      await prisma.collectionDetailRead.delete({ where: { id } });
      await prisma.collection.delete({ where: { id } });

      return collection;
    });
  }
}