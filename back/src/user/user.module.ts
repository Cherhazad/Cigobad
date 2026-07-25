import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { IUserRepository } from './domain/port/user.repository';
import { MysqlUserRepository } from './infrastructure/mysql-user.repository';
import { User } from './domain/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAllUserHandler } from './handlers/find-all/find-all-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './handlers/create/create-user.handler';
import { FindByIdUserHandler } from './handlers/find-by-id/find-by-id-user.handler';
import { UpdateUserHandler } from './handlers/update/update-user.handler';
import { DeleteByIdUserHandler } from './handlers/delete-by-id/delete-by-id-user.handler';

const QueryHandlers = [FindAllUserHandler, FindByIdUserHandler];
const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteByIdUserHandler,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: IUserRepository,
      useClass: MysqlUserRepository,
    },
  ],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
