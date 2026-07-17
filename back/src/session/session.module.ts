import { Module } from '@nestjs/common';
import { ISessionRepository } from './domain/port/session.repository';
import { Session } from './domain/entity/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSessionHandler } from './handlers/create/create-session.handler';
import { FindByIdSessionHandler } from './handlers/find-by-id/find-by-id-session.handler';
import { MySqlSessionRepository } from './repository/mysql-session.repository';
import { SessionController } from './controllers/session.controller';

const QueryHandlers = [FindByIdSessionHandler];
const CommandHandlers = [CreateSessionHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Session])],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: ISessionRepository,
      useClass: MySqlSessionRepository,
    },
  ],
  controllers: [SessionController],
  exports: [],
})
export class SessionModule {}
