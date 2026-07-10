import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../domain/ports/user.repository';
import { User } from '../domain/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MySqlUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.userRepository.softDelete(id);
  }
}
