import { Global, Module } from '@nestjs/common';
import { AccountService } from './account.service';

@Global()
@Module({
  controllers: [],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
