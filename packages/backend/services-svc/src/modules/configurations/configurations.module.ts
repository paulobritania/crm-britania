import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { DatabaseProvider } from '../../database/database.provider'
import { File } from '../files/entities/file.entity'
import { FilesModule } from '../files/files.module'
import { ConfigurationsController } from './configurations.controller'
import { ConfigurationsService } from './configurations.service'
import { Document } from './entities/document.entity'

@Module({
  imports: [SequelizeModule.forFeature([File, Document]), FilesModule],
  controllers: [ConfigurationsController],
  providers: [DatabaseProvider, ConfigurationsService]
})
export class ConfigurationsModule {}
