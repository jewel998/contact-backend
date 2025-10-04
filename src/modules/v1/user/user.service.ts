import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { ListUserDto } from './dto/list-user.dto';
import { AccountService } from '../account/account.service';
import { AccountAlreadyExists } from '../account/exceptions/account.exception';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AccountService))
    private readonly account: AccountService,
    private readonly db: DatabaseService,
  ) {}

  async create(data: CreateUserDto) {
    const { firstName, lastName, email, password } = data;
    const isRegistered = await this.account.isAlreadyRegistered(email);
    if (isRegistered) throw new AccountAlreadyExists();
    const user = await this.db.user.create({
      data: { firstName, lastName },
    });
    await this.account.register({ userId: user.id, password, email });

    return user;
  }

  list(query: ListUserDto) {
    return this.db.user.findMany({
      skip: query.limit * (query.page - 1),
      orderBy: { [query.sort]: query.order },
    });
  }

  getById(id: string) {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.db.user.update({ where: { id }, data });
  }
}
