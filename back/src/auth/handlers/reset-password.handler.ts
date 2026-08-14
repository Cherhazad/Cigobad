import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '../domain/port/auth.repository';
import { ResetPasswordCommand } from '../application/command/reset-password.command';
import { UserPayloadDto } from 'shared';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand> {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: ResetPasswordCommand) {
    let email: string;

    try {
      const payload: UserPayloadDto = this.jwtService.verify(command.token, {
        secret: this.configService.getOrThrow('JWT_RESET_SECRET'),
      });
      email = payload.email;
    } catch {
      throw new BadRequestException('Token invalide ou expiré');
    }

    const user = await this.authRepository.findByEmail(email);
    if (!user || user.resetToken !== command.token) {
      throw new BadRequestException('Token invalide');
    }

    const hashedPassword = await bcrypt.hash(command.newPassword, 10);
    await this.authRepository.updatePassword(email, hashedPassword);

    return { message: 'Mot de passe réinitialisé avec succès' };
  }
}
