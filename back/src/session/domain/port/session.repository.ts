import { Session } from '../entity/session.entity';
import { UpdateResult } from 'typeorm';

export interface ISessionRepository {
  findAll(): Promise<Session[]>;
  findById(id: number): Promise<Session>;
  create(session: Session): Promise<Session>;
  update(session: Session): Promise<Session>;
  remove(id: number): Promise<UpdateResult>;
}

export const ISessionRepository = Symbol('ISessionRepository');
