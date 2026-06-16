import { User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
}

export const IUserRepository = Symbol('IUserRepository');
