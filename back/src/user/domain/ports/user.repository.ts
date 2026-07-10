import { User } from '../entities/user.entity';
import { UpdateResult } from 'typeorm';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  remove(id: number): Promise<UpdateResult>;
}

export const IUserRepository = Symbol('IUserRepository');
