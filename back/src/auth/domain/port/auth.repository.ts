import { User } from '../../../user/domain/entity/user.entity';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  register(user: Partial<User>): Promise<User>;
  saveResetToken(email: string, token: string): Promise<void>;
  updatePassword(email: string, hashedPassword: string): Promise<void>;
}

export const IAuthRepository = Symbol('IAuthRepository');
