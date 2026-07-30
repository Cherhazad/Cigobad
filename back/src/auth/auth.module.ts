import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../user/domain/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { IAuthRepository } from './domain/port/auth.repository';
import { MysqlAuthRepository } from './infrastructure/mysql-auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginHandler } from './handlers/login.handler';
import { RegisterHandler } from './handlers/register.handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IUserRepository } from '../user/domain/port/user.repository';
import { MysqlUserRepository } from '../user/infrastructure/mysql-user.repository';

const CommandHandlers = [LoginHandler, RegisterHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
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
    {
      provide: IUserRepository,
      useClass: MysqlUserRepository,
    },
  ],
})
export class AuthModule {}
