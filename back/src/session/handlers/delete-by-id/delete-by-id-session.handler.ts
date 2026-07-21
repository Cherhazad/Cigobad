import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ISessionRepository } from '../../domain/port/session.repository';
import { Inject } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { DeleteByIdSessionCommand } from '../../query-command/command/delete-by-id-session.command';

@CommandHandler(DeleteByIdSessionCommand)
export class DeleteByIdSessionHandler implements ICommandHandler<DeleteByIdSessionCommand> {
  constructor(
    @Inject(ISessionRepository) private sessionRepository: ISessionRepository,
  ) {}

  async execute(query: DeleteByIdSessionCommand): Promise<UpdateResult> {
    return await this.sessionRepository.remove(query.id);
  }
}
