import { Module, HttpModule } from '@nestjs/common'

import { DatabaseProvider } from '../../database/database.provider'
import { LinesController } from './lines.controller'
import { LinesService } from './lines.service'

@Module({
  imports: [HttpModule],
  controllers: [LinesController],
  exports: [LinesService],
  providers: [DatabaseProvider, LinesService]
})
export class LinesModule {}
