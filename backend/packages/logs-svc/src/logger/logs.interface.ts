import { Log } from './entities/logs.entity'
import { FindAllLogsQueryDto } from './dto/findAllLogsQuery.dto'

export interface LogsService {
  create(log: Log): void;
  generateReport(query: FindAllLogsQueryDto, columns: Array<any>, res: Response): void;
}
