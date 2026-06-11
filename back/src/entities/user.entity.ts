import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '@shared/enums/category.enum';
import { Level } from '@shared/enums/level.enum';
import { Session } from '@shared/enums/session.enum';
import { Formula } from '@shared/enums/formula.enum';
import { Discount } from '@shared/enums/discount.enum';

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

  @Column()
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
