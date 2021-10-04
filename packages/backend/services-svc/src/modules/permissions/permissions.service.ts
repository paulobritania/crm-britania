import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'

import { Permission } from './entities/permission.entity'

@Injectable()
export class PermissionsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Permission) private permissionModel: typeof Permission
  ) {}

  /**
   * Lista todas as permissões
   */
  async findAll(): Promise<Permission[]> {
    return this.permissionModel.findAll()
  }

}
