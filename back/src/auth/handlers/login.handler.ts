import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../application/command/login.command';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { IAuthRepository } from '../domain/port/auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayloadDto } from 'shared';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<any> {
    const user = await this.authRepository.findByEmail(command.email);
    if (!user || !user.password)
      throw new UnauthorizedException('Email ou mot de passe incorrect');

    const isPasswordValid = await bcrypt.compare(
      command.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Email ou mot de passe incorrect');

    const payload: UserPayloadDto = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
