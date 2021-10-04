import {
  Column,
  DataType,
  Model,
  Table,
  HasOne
} from 'sequelize-typescript'

import { Access } from '../../accesses/entities/access.entity'
import { WorkflowType } from './workflowType.entity'

@Table({
  modelName: 'WorkflowTypeAccess',
  tableName: 'workflow_types_access',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowTypeAccess extends Model<WorkflowTypeAccess> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow_types_access record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  accessId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowTypeId: number

  @HasOne(() => Access, { sourceKey: 'accessId', foreignKey: 'id' })
  access: Access

  @HasOne(() => WorkflowType, { sourceKey: 'workflowTypeId', foreignKey: 'id' })
  workflowType: WorkflowType
}
