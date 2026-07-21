import { Module } from '@nestjs/common';
import { ISessionRepository } from './domain/port/session.repository';
import { Session } from './domain/entity/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSessionHandler } from './handlers/create/create-session.handler';
import { FindByIdSessionHandler } from './handlers/find-by-id/find-by-id-session.handler';
import { MySqlSessionRepository } from './repository/mysql-session.repository';
import { SessionController } from './controllers/session.controller';
import { MySqlUserRepository } from '../user/repository/mysql-user.repository';
import { IUserRepository } from '../user/domain/port/user.repository';
import { User } from '../user/domain/entity/user.entity';
import { FindAllSessionHandler } from './handlers/find-all/find-all-session.handler';
import { UpdateSessionHandler } from './handlers/update/update-session.handler';
import { DeleteByIdSessionHandler } from './handlers/delete-by-id/delete-by-id-session.handler';

const QueryHandlers = [FindByIdSessionHandler, FindAllSessionHandler];
const CommandHandlers = [
  CreateSessionHandler,
  UpdateSessionHandler,
  DeleteByIdSessionHandler,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Session, User])],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: ISessionRepository,
      useClass: MySqlSessionRepository,
    },
    {
      provide: IUserRepository,
      useClass: MySqlUserRepository,
    },
  ],
  controllers: [SessionController],
  exports: [],
})
export class SessionModule {}
