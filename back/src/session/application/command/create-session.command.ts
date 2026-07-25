import { SessionDto } from 'shared';

export class CreateSessionCommand {
  constructor(public readonly sessionDto: SessionDto) {}
}
