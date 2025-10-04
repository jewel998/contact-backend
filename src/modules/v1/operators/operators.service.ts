import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { Operator, Prisma } from 'generated/prisma';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';

@Injectable()
export class OperatorsService {
  constructor(private readonly prisma: DatabaseService) {}

  create(createOperatorDto: CreateOperatorDto): Promise<Operator> {
    const { ratings, ...rest } = createOperatorDto;
    const data: Prisma.OperatorCreateInput = {
      ...rest,
      ratings,
      ratingAvg: ratings.average,
    };
    return this.prisma.operator.create({ data });
  }

  findAll(): Promise<Operator[]> {
    return this.prisma.operator.findMany();
  }

  findOne(id: string): Promise<Operator | null> {
    return this.prisma.operator.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateOperatorDto: UpdateOperatorDto,
  ): Promise<Operator | null> {
    const { ratings, ...rest } = updateOperatorDto;
    const data: Prisma.OperatorUpdateInput = { ...rest };
    if (ratings) {
      data.ratings = ratings;
      data.ratingAvg = ratings.average;
    }
    return this.prisma.operator.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<Operator | null> {
    return this.prisma.operator.delete({ where: { id } });
  }
}