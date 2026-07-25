import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ISessionRepository } from '../../domain/port/session.repository';
import { Session } from '../../domain/entity/session.entity';
import { FindAllSessionQuery } from '../../application/query/find-all-session.query';

@QueryHandler(FindAllSessionQuery)
export class FindAllSessionHandler implements IQueryHandler<FindAllSessionQuery> {
  constructor(
    @Inject(ISessionRepository)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(): Promise<Session[]> {
    return await this.sessionRepository.findAll();
  }
}
