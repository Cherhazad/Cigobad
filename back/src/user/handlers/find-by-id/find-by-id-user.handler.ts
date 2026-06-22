import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindByIdUserQuery } from '../../query-command/queries/find-by-id-user.query';
import { IUserRepository } from '../../domain/ports/user.repository';
import { Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';

@QueryHandler(FindByIdUserQuery)
export class FindByIdUserHandler implements IQueryHandler<FindByIdUserQuery> {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(query: FindByIdUserQuery): Promise<User> {
    return await this.userRepository.findById(query.id);
  }
}
