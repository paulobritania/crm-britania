import { Log } from '../entities/logs.entity'

export interface LogsService {
  create(log: Log): void;
}
