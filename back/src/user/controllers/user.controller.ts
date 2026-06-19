import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'shared';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../query-command/commands/create-user.command';
import { FindAllUserQuery } from '../query-command/queries/find-all-user.query';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.queryBus.execute(new FindAllUserQuery());
  }

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.commandBus.execute(new CreateUserCommand(userDto));
  }
}
