import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.API_URL,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3008);

  const dataSource = app.get(DataSource);
  await dataSource.runMigrations();

  console.log('Hey babe! Server well started on port', process.env.PORT);
}
bootstrap();
