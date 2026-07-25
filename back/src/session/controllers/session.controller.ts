import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SessionDto } from 'shared';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSessionCommand } from '../application/command/create-session.command';
import { FindByIdSessionQuery } from '../application/query/find-by-id-session.query';
import { FindAllSessionQuery } from '../application/query/find-all-session.query';
import { UpdateResult } from 'typeorm';
import { UpdateSessionCommand } from '../application/command/update-session.command';
import { DeleteByIdSessionCommand } from '../application/command/delete-by-id-session.command';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('session')
export class SessionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Public()
  @Get()
  findAll(): Promise<SessionDto[]> {
    return this.queryBus.execute(new FindAllSessionQuery());
  }

  @Public()
  @Post()
  createSession(@Body() sessionDto: SessionDto): Promise<SessionDto> {
    return this.commandBus.execute(new CreateSessionCommand(sessionDto));
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<SessionDto> {
    return this.queryBus.execute(new FindByIdSessionQuery(id));
  }

  @Public()
  @Patch(':id')
  updateSession(@Body() sessionDto: SessionDto): Promise<SessionDto> {
    return this.commandBus.execute(new UpdateSessionCommand(sessionDto));
  }

  @Public()
  @Delete(':id')
  deleteSession(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    return this.commandBus.execute(new DeleteByIdSessionCommand(id));
  }
}
