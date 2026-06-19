import { User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  /* findOne(id: string): Promise<User>;*/
  create(user: User): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
