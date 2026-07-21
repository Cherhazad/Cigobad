import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import { ISessionRepository } from '../../domain/port/session.repository';
import { Session } from '../../domain/entity/session.entity';
import { UpdateSessionCommand } from '../../query-command/command/update-session.command';

@CommandHandler(UpdateSessionCommand)
export class UpdateSessionHandler implements ICommandHandler<UpdateSessionCommand> {
  constructor(
    @Inject(ISessionRepository) private sessionRepository: ISessionRepository,
  ) {}

  async execute(command: UpdateSessionCommand): Promise<Session> {
    const { id, name, level, hours, date, openedBy, attendees } =
      command.session;

    if (!id) {
      throw new BadRequestException('Session id is required for update');
    }

    const session = await this.sessionRepository.findById(id);

    if (name && session.name !== name) {
      session.name = name;
    }

    if (level && String(session.level) !== String(level)) {
      session.level = level;
    }

    if (hours && session.hours !== hours) {
      session.hours = hours;
    }

    if (date && session.date !== date) {
      const nextDate = typeof date === 'string' ? new Date(date) : date;
      if (session.date !== nextDate) {
        session.date = nextDate;
      }
    }

    if (openedBy && session.openedBy !== openedBy) {
      session.openedBy = openedBy;
    }

    if (attendees && session.attendees !== attendees) {
      //do it later
    }

    return this.sessionRepository.update(session);
  }
}
