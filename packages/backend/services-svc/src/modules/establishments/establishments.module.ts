import { Module, HttpModule } from '@nestjs/common'

import { EstablishmentsController } from './establishments.controller'
import { EstablishmentsService } from './establishments.service'

@Module({
  imports: [HttpModule],
  controllers: [EstablishmentsController],
  exports: [EstablishmentsService],
  providers: [EstablishmentsService]
})
export class EstablishmentsModule {}
