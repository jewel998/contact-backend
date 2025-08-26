import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { DatabaseService } from 'src/database/database.service';
import { compareSync, hashSync } from 'bcrypt';
import { AccountStatus } from './enum/status.enum';

@Injectable()
export class AccountService {
  constructor(private db: DatabaseService) {}
  private create(data: CreateAccountDto) {
    const id = data.userId;
    let password: string | null = null;
    if (data.password) {
      password = hashSync(data.password, 10);
    }

    return this.db.account.create({
      data: { id, password, disabled: false },
    });
  }

  private linkAccount(data: CreateAccountDto) {
    const { userId: id, email } = data;
    const provider = email.split('@')[1].split('.')[0];
    return this.db.linkedAccount.create({
      data: { id, email, provider, status: AccountStatus.UNVERIFIED },
    });
  }

  async register(data: CreateAccountDto) {
    await this.create(data);
    await this.linkAccount(data);
  }

  getById(id: string) {
    return this.db.account.findFirst({ where: { id } });
  }

  async verify(email: string, password: string) {
    try {
      const linkedAccount = await this.db.linkedAccount.findFirst({
        where: { email, status: { not: AccountStatus.INACTIVE } },
        select: { id: true },
      });
      if (linkedAccount) {
        const { id } = linkedAccount;
        const account = await this.db.account.findFirst({ where: { id } });
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
    return this.db.linkedAccount.findMany({ where: { id } });
  }

  private removeLinkedAccounts(id: string) {
    return this.db.linkedAccount.updateMany({
      where: { id },
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
