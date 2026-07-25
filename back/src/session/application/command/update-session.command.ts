import { SessionDto } from 'shared';

export class UpdateSessionCommand {
  constructor(public readonly session: SessionDto) {}
}
