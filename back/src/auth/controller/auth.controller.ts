import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from '../application/command/login.command';
import { RegisterCommand } from '../application/command/register.command';
import { UserDto } from 'shared';
import { Public } from '../decorators/public.decorator';
import type { Request } from 'express';
import { ResetPasswordCommand } from '../application/command/reset-password.command';
import { ForgotPasswordCommand } from '../application/command/forgot-password.command';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    return this.commandBus.execute(new LoginCommand(body.email, body.password));
  }

  @Public()
  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ): Promise<UserDto> {
    const user: UserDto = await this.commandBus.execute(
      new RegisterCommand(
        body.email,
        body.password,
        body.firstName,
        body.lastName,
      ),
    );
    if (user && typeof user === 'object') delete (user as any).password;
    return user;
  }

  @Get('me')
  getProfile(@Req() req: Request): Express.User | undefined {
    return req.user;
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }): Promise<UpdateResult> {
    return this.commandBus.execute(new ForgotPasswordCommand(body.email));
  }

  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body() body: { token: string; newPassword: string },
  ): Promise<UpdateResult> {
    return this.commandBus.execute(
      new ResetPasswordCommand(body.token, body.newPassword),
    );
  }
}
