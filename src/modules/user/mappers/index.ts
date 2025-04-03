import { InferSelectModel } from 'drizzle-orm';
import { User } from '../domain/user.entity';
import { UserDto } from '../dtos/user.dto';
import { user } from 'src/db/schema';

export class UserMapper {
  static toDomain(raw: InferSelectModel<typeof user>): User {
    return User.create(
      {
        name: raw.name,
        balance: parseFloat(raw.balance),
        email: raw.email,
        password: raw.password,
      },
      {
        id: raw.id || '',
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
    );
  }

  static toDto(entity: User): UserDto {
    return {
      id: entity.id!,
      name: entity.name,
      balance: entity.balance,
      email: entity.email,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }
}
