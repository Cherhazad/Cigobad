import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { IAuthRepository } from '../domain/port/auth.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../../email/service/email.service';
import { IUserRepository } from '../../user/domain/port/user.repository';
import { ForgotPasswordCommand } from '../application/command/forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgotPasswordCommand> {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async execute(command: ForgotPasswordCommand) {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) throw new NotFoundException('Email non trouvé');

    const token = this.jwtService.sign(
      { email: user.email },
      {
        secret: this.configService.getOrThrow('JWT_RESET_SECRET'),
        expiresIn: '1h',
      },
    );

    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY?.substring(0, 5));

    await this.authRepository.saveResetToken(user.email, token);
    await this.emailService.sendResetPasswordEmail(user.email, token);

    return { message: 'Email de réinitialisation envoyé' };
  }
}
