import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindByUniqueParams, IUserRepo } from './user-repo.interface';
import { User } from '../domain/user.entity';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from 'src/db/schema';
import { randomUUID } from 'crypto';
import { UserMapper } from '../mappers';

@Injectable()
export class UserRepoService implements IUserRepo {
  constructor(
    @Inject('DrizzleService')
    private readonly drizzleService: MySql2Database<typeof schema>,
  ) {}

  async create(user: User): Promise<User> {
    const uuid = randomUUID();

    await this.drizzleService.insert(schema.user).values({
      id: uuid,
      name: user.name,
      balance: user.balance.toString(),
      email: user.email,
      password: user.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await this.findByOrThrow({ id: uuid });

    return result;
  }

  async findBy(params: FindByUniqueParams): Promise<User | null> {
    const [key] = Object.keys(params) as ('id' | 'email')[];

    const column = schema.user[key];
    const value = params[key] as string;

    const result = await this.drizzleService.query.user.findFirst({
      where: (user, { and, eq }) => and(eq(column, value)),
    });

    if (!result) return null;

    return UserMapper.toDomain(result);
  }

  async findByOrThrow(params: FindByUniqueParams): Promise<User> {
    const result = await this.findBy(params);

    if (!result) {
      throw new NotFoundException('UserNotFoundError');
    }

    return result;
  }
}
