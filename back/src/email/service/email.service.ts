import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const url = `${process.env.EMAIL_RESET_URL}?token=${token}`;
    const text = `Bonjour,\n\nPour réinitialiser votre mot de passe, cliquez ici : ${url}\n\nCe lien expire dans 1 heure.`;

    if (process.env.NODE_ENV === 'production') {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'noreply@tondomaine.com',
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        text,
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      const info = await transporter.sendMail({
        from: '"CigoBad" <noreply@cigobad.fr>',
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        text,
      });
      // lien pour visualiser l'email dans le navigateur
      console.log('Email de test:', nodemailer.getTestMessageUrl(info));
    }
  }
}
