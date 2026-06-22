import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../../query-command/commands/update-user.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/entities/user.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const {
      id,
      formula,
      category,
      session,
      level,
      comment,
      birthDate,
      city,
      email,
      discount,
      phoneNumber,
      licenceNumber,
      lastName,
      firstName,
    } = command.user;

    let user: User = {} as User;
    if (id) {
      user = await this.userRepository.findById(id);
    }
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    if (firstName && user.firstName !== firstName) {
      user.firstName = firstName;
    }
    if (lastName && user.lastName !== lastName) {
      user.lastName = lastName;
    }
    if (category && user.category !== category) {
      user.category = category;
    }
    if (licenceNumber && user.licenceNumber !== licenceNumber) {
      user.licenceNumber = licenceNumber;
    }
    if (city && user.city !== city) {
      user.city = city;
    }
    if (email && user.email !== email) {
      user.email = email;
    }
    if (discount && discount !== discount) {
      user.discount = discount;
    }
    if (phoneNumber && user.phoneNumber !== phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (formula && user.formula !== formula) {
      user.formula = formula;
    }
    if (birthDate && user.birthDate !== birthDate) {
      user.birthDate = birthDate;
    }
    if (session && user.session !== session) {
      user.session = session;
    }
    if (level && user.level !== level) {
      user.level = level;
    }
    if (comment && user.comment !== comment) {
      user.comment = comment;
    }

    return this.userRepository.update(user);
  }
}
