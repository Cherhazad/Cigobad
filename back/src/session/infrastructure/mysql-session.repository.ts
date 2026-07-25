import { Injectable, NotFoundException } from '@nestjs/common';
import { ISessionRepository } from '../domain/port/session.repository';
import { Session } from '../domain/entity/session.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MysqlSessionRepository implements ISessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}
  async findById(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }

    return session;
  }

  findAll(): Promise<Session[]> {
    return this.sessionRepository.find();
  }

  create(session: Session): Promise<Session> {
    return this.sessionRepository.save(session);
  }

  update(session: Session): Promise<Session> {
    return this.sessionRepository.save(session);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.sessionRepository.softDelete(id);
  }
}
