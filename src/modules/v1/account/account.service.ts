import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { DatabaseService } from 'src/database/database.service';
import { compareSync, hashSync } from 'bcrypt';
import { AccountStatus } from './enum/status.enum';

@Injectable()
export class AccountService {
  constructor(private db: DatabaseService) {}
  private create(data: CreateAccountDto) {
    const { userId, password: rawPassword } = data;
    let password: string | null = null;
    if (rawPassword) {
      password = hashSync(rawPassword, 10);
    }

    return this.db.account.create({
      data: { userId, password, disabled: false },
    });
  }

  private linkAccount(accountId: string, email: string) {
    const provider = email.split('@')[1].split('.')[0];
    return this.db.linkedAccount.create({
      data: { accountId, email, provider, status: AccountStatus.UNVERIFIED },
    });
  }

  async register(data: CreateAccountDto) {
    const account = await this.create(data);
    await this.linkAccount(account.id, data.email);
  }

  getById(id: string) {
    return this.db.account.findFirst({ where: { id } });
  }

  async verify(email: string, password: string) {
    try {
      const linkedAccount = await this.db.linkedAccount.findFirst({
        where: { email, status: { not: AccountStatus.INACTIVE } },
        select: { accountId: true },
      });
      if (linkedAccount) {
        const { accountId } = linkedAccount;
        const account = await this.db.account.findFirst({
          where: { id: accountId },
        });
        if (account && compareSync(password, account.password ?? '')) {
          return account.id;
        }
      }
    } catch {
      // return response
    }

    return null;
  }

  async isAlreadyRegistered(email: string) {
    const account = await this.db.linkedAccount.findFirst({
      where: { email, status: { not: AccountStatus.INACTIVE } },
    });
    if (!account) return false;
    return true;
  }

  async getLinkedAccounts(id: string) {
    return this.db.linkedAccount.findMany({ where: { accountId: id } });
  }

  private removeLinkedAccounts(id: string) {
    return this.db.linkedAccount.updateMany({
      where: { accountId: id },
      data: { status: AccountStatus.INACTIVE },
    });
  }

  async removeAccount(id: string) {
    await this.db.account.updateMany({
      where: { id },
      data: { disabled: true },
    });
    await this.removeLinkedAccounts(id);
  }
}
