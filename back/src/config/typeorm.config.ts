import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const AppDataSource = new DataSource({
  type: 'mysql', // ou 'postgres' si tu changes
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  synchronize: false, // IMPORTANT en prod + migrations
  logging: true,

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],

  migrationsRun: true,
});

export default AppDataSource;
