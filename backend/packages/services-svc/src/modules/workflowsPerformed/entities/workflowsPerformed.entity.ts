/* eslint-disable import/no-cycle */
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table
} from 'sequelize-typescript'

import { User } from '../../users/entities/user.entity'
import { Workflow } from '../../workflows/entities/workflow.entity'
import { WorkflowPerformedResponse } from './workflowPerformedResponses.entity'

@Table({
  modelName: 'WorkflowPerformed',
  tableName: 'workflows_performed',
  underscored: true,
  version: false,
  timestamps: false
})
export class WorkflowPerformed extends Model<WorkflowPerformed> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow performed record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowId: number

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  concluded: boolean

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  identifier: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  clientCode: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  responsibleCode: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy: number

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  createdAt: string

  @HasOne(() => Workflow, { sourceKey: 'workflowId', foreignKey: 'id' })
  workflow: Workflow

  @HasOne(() => User, { sourceKey: 'createdBy', foreignKey: 'id' })
  createdByUser: User

  @HasMany(() => WorkflowPerformedResponse, {
    as: 'workflowPerformedResponses',
    sourceKey: 'id',
    foreignKey: 'workflowPerformedId'
  })
  workflowPerformedResponses: WorkflowPerformedResponse[]
}
