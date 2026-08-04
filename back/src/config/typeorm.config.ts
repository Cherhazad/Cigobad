import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'node:path';

config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  synchronize: false,
  logging: true,

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  migrations: [
    join(
      __dirname,
      `../database/migrations/*.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`,
    ),
  ],

  migrationsRun: true,
});

export default AppDataSource;
