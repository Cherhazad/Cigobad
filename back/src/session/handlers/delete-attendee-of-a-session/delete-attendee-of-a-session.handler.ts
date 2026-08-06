import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ISessionRepository } from '../../domain/port/session.repository';
import { Inject } from '@nestjs/common';
import { DeleteAttendeeOfASessionCommand } from '../../application/command/delete-attendee-of-a-session.command';
import { SessionDto } from 'shared';

@CommandHandler(DeleteAttendeeOfASessionCommand)
export class DeleteAttendeeOfASessionHandler implements ICommandHandler<DeleteAttendeeOfASessionCommand> {
  constructor(
    @Inject(ISessionRepository) private sessionRepository: ISessionRepository,
  ) {}

  async execute(command: DeleteAttendeeOfASessionCommand): Promise<SessionDto> {
    const session = await this.sessionRepository.findById(command.sessionId);

    session.attendees = session.attendees.filter(
      (a) => a.id !== command.userId,
    );
    return await this.sessionRepository.update(session);
  }
}
