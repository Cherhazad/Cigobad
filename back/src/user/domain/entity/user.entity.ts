import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category, Discount, Formula, Level, Role, SessionEnum } from 'shared';
import { Session } from '../../../session/domain/entity/session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
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
    enum: SessionEnum,
    nullable: true,
  })
  session: SessionEnum[];

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

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  delete_at: Date | null;

  @ManyToMany(() => Session, (session) => session.attendees)
  sessions: Session[];
}
