import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindByIdUserQuery } from '../../application/queries/find-by-id-user.query';
import { IUserRepository } from '../../domain/port/user.repository';
import { Inject } from '@nestjs/common';
import { User } from '../../domain/entity/user.entity';

@QueryHandler(FindByIdUserQuery)
export class FindByIdUserHandler implements IQueryHandler<FindByIdUserQuery> {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(query: FindByIdUserQuery): Promise<User> {
    return await this.userRepository.findById(query.id);
  }
}
