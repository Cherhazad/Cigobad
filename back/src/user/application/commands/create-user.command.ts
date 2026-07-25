import { UserDto } from 'shared';

export class CreateUserCommand {
  constructor(public readonly userDto: UserDto) {}
}
