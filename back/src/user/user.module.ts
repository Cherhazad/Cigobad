import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { IUserRepository } from './domain/ports/user.repository';
import { MySqlUserRepository } from './repositories/mysql-user.repository';
import { User } from './domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFindAllHandler } from './handlers/find-all/user-find-all.handler';
import { CqrsModule } from '@nestjs/cqrs';

const QueryHandlers = [UserFindAllHandler];
const CommandHandlers = [];

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
