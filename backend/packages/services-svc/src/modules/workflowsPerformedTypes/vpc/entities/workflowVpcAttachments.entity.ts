/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { File } from '../../../files/entities/file.entity'
import { WorkflowVpc } from './workflowVpc.entity'

@Table({
  modelName: 'WorkflowVpcAttachment',
  tableName: 'workflow_vpc_attachments',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowVpcAttachment extends Model<WorkflowVpcAttachment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowVpcLineFamily'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  description: string

  @BelongsTo(() => WorkflowVpc, {
    foreignKey: 'workflowVpcId',
    targetKey: 'id'
  })
  vpc: WorkflowVpc

  @BelongsTo(() => File, {
    foreignKey: 'fileId',
    targetKey: 'id'
  })
  file: File
}
