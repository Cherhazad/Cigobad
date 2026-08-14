import { Injectable } from '@nestjs/common';
import { User } from '../../user/domain/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MysqlAuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findByEmail = (email: string): Promise<User | null> => {
    return this.userRepository.findOne({ where: { email } });
  };

  register = async (user: Partial<User>): Promise<User> => {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  };

  saveResetToken = async (email: string, token: string): Promise<void> => {
    await this.userRepository.update({ email }, { resetToken: token });
  };

  updatePassword = async (
    email: string,
    hashedPassword: string,
  ): Promise<void> => {
    await this.userRepository.update(
      { email },
      { password: hashedPassword, resetToken: null },
    );
  };
}
