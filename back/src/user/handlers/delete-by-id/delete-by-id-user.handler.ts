import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteByIdUserCommand } from '../../query-command/commands/delete-by-id-user.command';
import { IUserRepository } from '../../domain/port/user.repository';
import { Inject } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

@CommandHandler(DeleteByIdUserCommand)
export class DeleteByIdUserHandler implements ICommandHandler<DeleteByIdUserCommand> {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(query: DeleteByIdUserCommand): Promise<UpdateResult> {
    return await this.userRepository.remove(query.id);
  }
}
