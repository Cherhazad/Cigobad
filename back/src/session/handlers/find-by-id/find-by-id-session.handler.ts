import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ISessionRepository } from '../../domain/port/session.repository';
import { Inject } from '@nestjs/common';
import { Session } from '../../domain/entity/session.entity';
import { FindByIdSessionQuery } from '../../application/query/find-by-id-session.query';

@QueryHandler(FindByIdSessionQuery)
export class FindByIdSessionHandler implements IQueryHandler<FindByIdSessionQuery> {
  constructor(
    @Inject(ISessionRepository) private sessionRepository: ISessionRepository,
  ) {}

  async execute(query: FindByIdSessionQuery): Promise<Session> {
    return await this.sessionRepository.findById(query.id);
  }
}
