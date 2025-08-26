import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { ContactModule } from './contact/contact.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [AuthModule, UserModule, AccountModule, ContactModule, TenantModule],
})
export class V1Module {}
