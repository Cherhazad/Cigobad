import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from 'shared';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../query-command/commands/create-user.command';
import { FindAllUserQuery } from '../query-command/queries/find-all-user.query';
import { FindByIdUserQuery } from '../query-command/queries/find-by-id-user.query';
import { UpdateUserCommand } from '../query-command/commands/update-user.command';

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
  createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return this.commandBus.execute(new CreateUserCommand(userDto));
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.queryBus.execute(new FindByIdUserQuery(id));
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ): Promise<UserDto> {
    userDto.id = id;
    return this.commandBus.execute(new UpdateUserCommand(userDto));
  }
}
