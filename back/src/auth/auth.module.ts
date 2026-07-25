import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../user/domain/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { IAuthRepository } from './domain/port/auth.repository';
import { LoginCommand } from './application/command/login.command';
import { RegisterCommand } from './application/command/register.command';
import { MysqlAuthRepository } from './infrastructure/mysql-auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';

const CommandHandlers = [LoginCommand, RegisterCommand];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...CommandHandlers,
    JwtStrategy,
    {
      provide: IAuthRepository,
      useClass: MysqlAuthRepository,
    },
  ],
})
export class AuthModule {}
