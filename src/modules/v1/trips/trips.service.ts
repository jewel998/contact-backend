import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Trip, TripRead, TripDetailRead } from '../../../../generated/prisma';
import { OperatorsService } from '../operators/operators.service';

@Injectable()
export class TripsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly operatorsService: OperatorsService,
  ) {}

  async create(data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
    const trip = await this.prisma.trip.create({ data });

    const { id, active, destinations, durationDays, months, nextStartDate, operatorId, priceFrom, primaryDestination, slug, tags, title, tripType, startFrom, theme, content, isVerifiedOperator, operatorName } = trip;

    await this.prisma.$transaction([
      this.prisma.tripRead.create({
        data: {
          id,
          active,
          destinations,
          durationDays,
          minPrice: priceFrom,
          months,
          nextStartDate,
          operator: {
            id: operatorId,
            name: operatorName,
            verified: isVerifiedOperator,
          },
          primaryDestination,
          slug,
          tags,
          title,
          tripType,
          startFrom,
          theme,
        },
      }),
      this.prisma.tripDetailRead.create({
        data: {
          id,
          content,
          destinations,
          durationDays,
          operator: {
            id: operatorId,
            name: operatorName,
            verified: isVerifiedOperator,
          },
          primaryDestination,
          slug,
          tags,
          title,
          tripType,
          startFrom,
          theme,
        },
      }),
    ]);

    await this.operatorsService.refreshOperatorAggregates(operatorId);

    return trip;
  }

  async findAll(): Promise<TripRead[]> {
    return this.prisma.tripRead.findMany();
  }

  async findOne(id: string): Promise<TripDetailRead | null> {
    return this.prisma.tripDetailRead.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Trip>): Promise<Trip | null> {
    return this.prisma.$transaction(async (prisma) => {
      const originalTrip = await prisma.trip.findUnique({ where: { id } });
      if (!originalTrip) {
        return null;
      }

      const updatedTrip = await prisma.trip.update({
        where: { id },
        data,
      });

      const { active, destinations, durationDays, months, nextStartDate, operatorId, priceFrom, primaryDestination, slug, tags, title, tripType, startFrom, theme, content, isVerifiedOperator, operatorName } = updatedTrip;

      await prisma.tripRead.update({
        where: { id },
        data: {
          active,
          destinations,
          durationDays,
          minPrice: priceFrom,
          months,
          nextStartDate,
          operator: {
            id: operatorId,
            name: operatorName,
            verified: isVerifiedOperator,
          },
          primaryDestination,
          slug,
          tags,
          title,
          tripType,
          startFrom,
          theme,
        },
      });

      await prisma.tripDetailRead.update({
        where: { id },
        data: {
          content,
          destinations,
          durationDays,
          operator: {
            id: operatorId,
            name: operatorName,
            verified: isVerifiedOperator,
          },
          primaryDestination,
          slug,
          tags,
          title,
          tripType,
          startFrom,
          theme,
        },
      });

      // If the operatorId has changed, we need to refresh both the old and new operators.
      if (originalTrip.operatorId !== updatedTrip.operatorId) {
        await this.operatorsService.refreshOperatorAggregates(originalTrip.operatorId, prisma);
      }
      await this.operatorsService.refreshOperatorAggregates(updatedTrip.operatorId, prisma);

      return updatedTrip;
    });
  }

  async remove(id: string): Promise<Trip | null> {
    return this.prisma.$transaction(async (prisma) => {
      const trip = await prisma.trip.findUnique({ where: { id } });
      if (!trip) {
        return null;
      }

      await prisma.tripRead.deleteMany({ where: { id } });
      await prisma.tripDetailRead.deleteMany({ where: { id } });
      await prisma.trip.delete({ where: { id } });

      await this.operatorsService.refreshOperatorAggregates(trip.operatorId, prisma);

      return trip;
    });
  }
}