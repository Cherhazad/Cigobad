import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ISessionRepository } from '../../domain/port/session.repository';
import { Inject } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { DeleteByIdSessionCommand } from '../../application/command/delete-by-id-session.command';

@CommandHandler(DeleteByIdSessionCommand)
export class DeleteByIdSessionHandler implements ICommandHandler<DeleteByIdSessionCommand> {
  constructor(
    @Inject(ISessionRepository) private sessionRepository: ISessionRepository,
  ) {}

  async execute(command: DeleteByIdSessionCommand): Promise<UpdateResult> {
    const session = await this.sessionRepository.findById(command.id);
    session.attendees = [];
    await this.sessionRepository.update(session);
    return await this.sessionRepository.remove(command.id);
  }
}
