import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Session } from '../../domain/entity/session.entity';
import { CreateSessionCommand } from '../../query-command/command/create-session.command';
import { ISessionRepository } from '../../domain/port/session.repository';
import { User } from '../../../user/domain/entity/user.entity';
import { IUserRepository } from '../../../user/domain/port/user.repository';

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler implements IQueryHandler<CreateSessionCommand> {
  constructor(
    @Inject(ISessionRepository)
    private readonly sessionRepository: ISessionRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateSessionCommand): Promise<Session> {
    const { name, level, hours, openedById, attendees } = command.sessionDto;

    const session = new Session();
    if (name) {
      session.name = name;
    }
    if (level) {
      session.level = level;
    }
    if (hours) {
      session.hours = hours;
    }
    if (openedById) {
      session.openedById = openedById;
    }
    if (attendees) {
      const users: User[] = [];
      for (const attendee of attendees) {
        if (attendee.id == null) continue;
        users.push(await this.userRepository.findById(attendee.id));
      }
      if (users.length > 0) {
        session.attendees = users;
      }
    }

    return await this.sessionRepository.create(session);
  }
}
