import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { OperatorsService } from '../operators/operators.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripDto } from './dto/trip.dto';
import { TripReadDto } from './dto/trip-read.dto';
import { TripDetailReadDto } from './dto/trip-detail-read.dto';

@Injectable()
export class TripsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly operatorsService: OperatorsService,
  ) {}

  async create(createTripDto: CreateTripDto): Promise<TripDto> {
    const trip = await this.prisma.trip.create({ data: createTripDto });

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

  async findAll(): Promise<TripReadDto[]> {
    return this.prisma.tripRead.findMany();
  }

  async findOne(id: string): Promise<TripDetailReadDto | null> {
    return this.prisma.tripDetailRead.findUnique({ where: { id } });
  }

  async update(id: string, updateTripDto: UpdateTripDto): Promise<TripDto | null> {
    return this.prisma.$transaction(async (prisma) => {
      const originalTrip = await prisma.trip.findUnique({ where: { id } });
      if (!originalTrip) {
        return null;
      }

      const updatedTrip = await prisma.trip.update({
        where: { id },
        data: updateTripDto,
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

      if (originalTrip.operatorId !== updatedTrip.operatorId) {
        await this.operatorsService.refreshOperatorAggregates(originalTrip.operatorId, prisma);
      }
      await this.operatorsService.refreshOperatorAggregates(updatedTrip.operatorId, prisma);

      return updatedTrip;
    });
  }

  async remove(id: string): Promise<TripDto | null> {
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