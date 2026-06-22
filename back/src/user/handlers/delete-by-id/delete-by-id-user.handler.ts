import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DeleteByIdUserQuery } from '../../query-command/queries/delete-by-id-user.query';
import { IUserRepository } from '../../domain/ports/user.repository';
import { Inject } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

@QueryHandler(DeleteByIdUserQuery)
export class DeleteByIdUserHandler implements IQueryHandler<DeleteByIdUserQuery> {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(query: DeleteByIdUserQuery): Promise<UpdateResult> {
    return await this.userRepository.remove(query.id);
  }
}
