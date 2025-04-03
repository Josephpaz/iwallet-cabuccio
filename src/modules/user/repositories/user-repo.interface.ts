import { User } from '../domain/user.entity';

export type FindByUniqueParams = { id: string } | { email: string };

export interface IUserRepo {
  create(user: User): Promise<User>;
  findBy(params: FindByUniqueParams): Promise<User | null>;
  findByOrThrow(params: FindByUniqueParams): Promise<User>;
}
