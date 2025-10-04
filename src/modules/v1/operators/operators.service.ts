import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Operator, OperatorRead, OperatorDetailRead } from '../../../../generated/prisma';

@Injectable()
export class OperatorsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: Omit<Operator, 'id' | 'createdAt' | 'updatedAt'>): Promise<Operator> {
    return this.prisma.$transaction(async (prisma) => {
      const operator = await prisma.operator.create({ data });
      const { id, slug, name, ratingAvg, verified, address, aliases, brand, legalNames, links, ratings, profile } = operator;

      // When a new operator is created, there are no trips yet.
      // So, we'll use default values for trip-dependent fields.
      const tripsCount = 0;
      const minPrice = 0;
      const nextStartDate = '';
      const currency = ''; // Default currency, as no trips exist yet.
      const regions = []; // No clear source for regions in the schema.
      const topTags = []; // No clear source for top tags in the schema.

      await prisma.operatorRead.create({
        data: {
          id,
          slug,
          name,
          ratingAvg,
          verified,
          minPrice,
          nextStartDate,
          regions,
          tripsCount,
          rating: ratingAvg,
          currency,
          logoUrl: (brand as any)?.logoUrl || null,
          topTags,
        },
      });

      await prisma.operatorDetailRead.create({
        data: {
          id,
          slug,
          name,
          ratingAvg,
          verified,
          address,
          aliases,
          brand,
          legalNames,
          links,
          ratings,
          profile,
          minPrice,
          nextStartDate,
          regions,
          tripsCount,
        },
      });

      return operator;
    });
  }

  async findAll(): Promise<OperatorRead[]> {
    return this.prisma.operatorRead.findMany();
  }

  async findOne(id: string): Promise<OperatorDetailRead | null> {
    return this.prisma.operatorDetailRead.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Operator>): Promise<Operator | null> {
    return this.prisma.$transaction(async (prisma) => {
      const operatorExists = await prisma.operator.findUnique({ where: { id } });
      if (!operatorExists) {
        return null;
      }

      const updatedOperator = await prisma.operator.update({
        where: { id },
        data,
      });

      await this.refreshOperatorAggregates(id, prisma);

      return updatedOperator;
    });
  }

  async refreshOperatorAggregates(operatorId: string, tx?: any) {
    const prisma = tx || this.prisma;

    const operator = await prisma.operator.findUnique({ where: { id: operatorId } });
    if (!operator) {
      console.warn(`Operator with ID ${operatorId} not found for aggregate refresh.`);
      return;
    }

    const { slug, name, ratingAvg, verified, address, aliases, brand, legalNames, links, ratings, profile } = operator;

    const trips = await prisma.trip.findMany({
      where: { operatorId: operatorId },
      select: { priceFrom: true, nextStartDate: true, currency: true },
    });

    const tripsCount = trips.length;
    const prices = trips.map((t) => t.priceFrom).filter((p) => p != null);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const nextStartDate = trips.length > 0 ? trips.map((t) => t.nextStartDate).filter((d) => d != null).sort()[0] || '' : '';
    const currency = trips.length > 0 ? trips[0].currency : '';

    const regions = [];
    const topTags = [];

    await prisma.operatorRead.update({
      where: { id: operatorId },
      data: {
        slug,
        name,
        ratingAvg,
        verified,
        minPrice,
        nextStartDate,
        regions,
        tripsCount,
        rating: ratingAvg,
        currency,
        logoUrl: (brand as any)?.logoUrl || null,
        topTags,
      },
    });

    await prisma.operatorDetailRead.update({
      where: { id: operatorId },
      data: {
        slug,
        name,
        ratingAvg,
        verified,
        address,
        aliases,
        brand,
        legalNames,
        links,
        ratings,
        profile,
        minPrice,
        nextStartDate,
        regions,
        tripsCount,
      },
    });
  }

  async remove(id: string): Promise<Operator | null> {
    return this.prisma.$transaction(async (prisma) => {
      const operator = await prisma.operator.findUnique({ where: { id } });
      if (!operator) {
        return null;
      }

      // In a real application, we might need to handle what happens to trips associated with this operator.
      // The schema does not specify cascading deletes. For now, we only delete the operator and its read models.
      await prisma.operatorRead.delete({ where: { id } });
      await prisma.operatorDetailRead.delete({ where: { id } });
      await prisma.operator.delete({ where: { id } });

      return operator;
    });
  }
}