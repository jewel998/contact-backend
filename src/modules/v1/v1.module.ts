import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { TenantModule } from './tenant/tenant.module';
import { TripsModule } from './trips/trips.module';
import { OperatorsModule } from './operators/operators.module';
import { CollectionsModule } from './collections/collections.module';
import { DestinationsModule } from './destinations/destinations.module';
import { SchedulesModule } from './schedules/schedules.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/', module: AuthModule },
      { path: '/', module: UserModule },
      { path: '/', module: AccountModule },
      { path: '/', module: TenantModule },
      { path: '/', module: TripsModule },
      { path: '/', module: OperatorsModule },
      { path: '/', module: CollectionsModule },
      { path: '/', module: DestinationsModule },
      { path: '/', module: SchedulesModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    UserModule,
    AccountModule,
    TenantModule,
    TripsModule,
    OperatorsModule,
    CollectionsModule,
    DestinationsModule,
    SchedulesModule,
  ],
})
export class V1Module {}
