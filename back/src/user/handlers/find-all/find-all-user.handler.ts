import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FindAllUserQuery } from '../../application/queries/find-all-user.query';
import { IUserRepository } from '../../domain/port/user.repository';
import { User } from '../../domain/entity/user.entity';

@QueryHandler(FindAllUserQuery)
export class FindAllUserHandler implements IQueryHandler<FindAllUserQuery> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
