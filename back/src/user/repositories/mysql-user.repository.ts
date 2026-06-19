import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/ports/user.repository';
import { User } from '../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MySqlUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
