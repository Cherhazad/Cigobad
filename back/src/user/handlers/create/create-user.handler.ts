import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { IUserRepository } from '../../domain/port/user.repository';
import { Inject } from '@nestjs/common';
import { User } from '../../domain/entity/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const {
      firstName,
      lastName,
      phoneNumber,
      birthDate,
      city,
      email,
      discount,
      formula,
      category,
      session,
      level,
      comment,
    } = command.userDto;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    if (city) {
      user.city = city;
    }
    if (email) {
      user.email = email;
    }
    if (birthDate && typeof birthDate === 'string') {
      user.birthDate = new Date(birthDate);
    } else {
      user.birthDate = birthDate;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (category) {
      user.category = category;
    }
    if (session) {
      user.session = session;
    }
    if (discount) {
      user.discount = discount;
    }
    if (formula) {
      user.formula = formula;
    }
    if (level) {
      user.level = level;
    }
    if (comment) {
      user.comment = comment;
    }

    return await this.userRepository.create(user);
  }
}
