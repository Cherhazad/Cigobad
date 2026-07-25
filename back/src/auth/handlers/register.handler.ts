import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '../domain/port/auth.repository';
import { RegisterCommand } from '../application/command/register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(command: RegisterCommand) {
    const existingUser = await this.authRepository.findByEmail(command.email);

    if (existingUser) throw new ConflictException('Cet email est déjà utilisé');

    const hashedPassword = await bcrypt.hash(command.password, 10);

    return this.authRepository.register({
      email: command.email,
      password: hashedPassword,
      firstName: command.firstName,
      lastName: command.lastName,
    });
  }
}
