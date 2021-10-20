/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { File } from '../../../files/entities/file.entity'
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanDocument',
  tableName: 'workflow_fan_documents',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanDocument extends Model<WorkflowFanDocument> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowFanDocument'
  })
  id: number

  @Column({
    type: DataType.STRING(50),
    allowNull: true
  })
  description: string

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan

  @BelongsTo(() => File, {
    foreignKey: 'fileId',
    targetKey: 'id'
  })
  file: File

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  fileId: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  version: number
}
