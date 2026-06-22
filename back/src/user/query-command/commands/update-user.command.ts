import { UserDto } from 'shared';

export class UpdateUserCommand {
  constructor(public readonly user: UserDto) {}
}
