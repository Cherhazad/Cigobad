import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category, Discount, Formula, Level, Session } from 'shared';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column({ nullable: true })
  licenceNumber: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  category: Category;

  @Column({ nullable: true })
  level: Level;

  @Column({
    type: 'set',
    enum: Session,
    nullable: true,
  })
  session: Session[];

  @Column({ nullable: true })
  formula: Formula;

  @Column({ nullable: true })
  discount: Discount;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  isAccepted: boolean;

  @Column({ nullable: true })
  hasPaid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
