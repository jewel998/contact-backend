import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { OperatorsModule } from '@/modules/v1/operators/operators.module';

@Module({
  imports: [OperatorsModule],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
