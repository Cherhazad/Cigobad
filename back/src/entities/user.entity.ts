import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category, Discount, Formula, Level, Session } from '@shared';

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

  @Column()
  city: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  category: Category;

  @Column()
  level: Level;

  @Column({
    type: 'enum',
    enum: Session,
  })
  session: Session[];

  @Column()
  formula: Formula;

  @Column()
  discount: Discount;

  @Column()
  isAccepted: boolean;

  @Column()
  hasPaid: boolean;
}
