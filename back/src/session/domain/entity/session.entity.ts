import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Level } from 'shared';
import { User } from '../../../user/domain/entity/user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  level: Level;

  @Column({ nullable: true })
  hours: string;

  @Column({ nullable: true })
  openedBy: string;

  @Column({ nullable: true })
  date: Date;

  @ManyToMany(() => User, (user) => user.sessions, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  attendees: User[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  delete_at: Date | null;
}
