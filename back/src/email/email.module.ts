import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './service/email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: 'smtp.resend.com',
          port: 465,
          secure: false,
          requireTLS: true,
          auth: {
            user: 'resend',
            pass: config.get('RESEND_API_KEY'),
          },
        },
        defaults: {
          from: '"CigoBad" <onboarding@resend.dev>',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
