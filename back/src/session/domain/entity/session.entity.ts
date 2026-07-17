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

  @Column()
  name: string;

  @Column()
  level: Level;

  @Column()
  hours: string;

  @Column({ nullable: true })
  openedById: number;

  @ManyToMany(() => User, (user) => user.sessions)
  @JoinTable()
  attendees: User[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  delete_at: Date | null;
}
