import { User } from '../../../user/domain/entity/user.entity';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  register(user: Partial<User>): Promise<User>;
}

export const IAuthRepository = Symbol('IAuthRepository');
