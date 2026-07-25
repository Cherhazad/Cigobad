import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';
import { UserDto } from 'shared';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../application/commands/create-user.command';
import { FindAllUserQuery } from '../application/queries/find-all-user.query';
import { FindByIdUserQuery } from '../application/queries/find-by-id-user.query';
import { UpdateUserCommand } from '../application/commands/update-user.command';
import { UpdateResult } from 'typeorm';
import { DeleteByIdUserCommand } from '../application/commands/delete-by-id-user.command';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Public()
  @Get()
  findAll(): Promise<UserDto[]> {
    return this.queryBus.execute(new FindAllUserQuery());
  }

  @Public()
  @Post()
  createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return this.commandBus.execute(new CreateUserCommand(userDto));
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.queryBus.execute(new FindByIdUserQuery(id));
  }

  @Public()
  @Patch(':id')
  updateUser(@Body() userDto: UserDto): Promise<UserDto> {
    return this.commandBus.execute(new UpdateUserCommand(userDto));
  }

  @Public()
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    return this.commandBus.execute(new DeleteByIdUserCommand(id));
  }
}
