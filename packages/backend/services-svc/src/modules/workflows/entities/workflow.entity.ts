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
import { WorkflowHistory } from './workflowHistory.entity'
import { WorkflowTask } from './workflowTask.entity'
import { WorkflowType } from './workflowType.entity'

@Table({
  modelName: 'Workflow',
  tableName: 'workflows',
  underscored: true,
  version: false,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['type_id', 'version', 'subversion']
    }
  ]
})
export class Workflow extends Model<Workflow> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING(80)
  })
  title: string

  @Column({
    allowNull: false,
    type: DataType.STRING(200)
  })
  description: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  typeId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  version: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  subversion: number

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  active: boolean

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  dateStart: string

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  dateEnd: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  updatedBy?: number

  @HasOne(() => User, { sourceKey: 'createdBy', foreignKey: 'id' })
  createdByUser: User

  @HasOne(() => User, { sourceKey: 'updatedBy', foreignKey: 'id' })
  updatedByUser: User

  @HasOne(() => WorkflowType, { sourceKey: 'typeId', foreignKey: 'id' })
  workflowType: WorkflowType

  @HasMany(() => WorkflowTask, {
    as: 'tasks',
    sourceKey: 'id',
    foreignKey: 'workflowId'
  })
  tasks: WorkflowTask[]

  @HasOne(() => WorkflowHistory, { sourceKey: 'id', foreignKey: 'workflowId' })
  workflowHistory: WorkflowHistory
}
