import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { IUserRepository } from './domain/ports/user.repository';
import { MySqlUserRepository } from './repositories/mysql-user.repository';
import { User } from './domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAllUserHandler } from './handlers/find-all/find-all-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './handlers/create/create-user.handler';
import { FindByIdUserHandler } from './handlers/find-by-id/find-by-id-user.handler';
import { UpdateUserCommandHandler } from './handlers/update/update-user.handler';
import { DeleteByIdUserHandler } from './handlers/delete-by-id/delete-by-id-user.handler';

const QueryHandlers = [
  FindAllUserHandler,
  FindByIdUserHandler,
  DeleteByIdUserHandler,
];
const CommandHandlers = [CreateUserHandler, UpdateUserCommandHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: IUserRepository,
      useClass: MySqlUserRepository,
    },
  ],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
