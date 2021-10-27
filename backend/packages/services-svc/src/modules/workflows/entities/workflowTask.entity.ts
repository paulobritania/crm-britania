/* eslint-disable import/no-cycle */
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table
} from 'sequelize-typescript'

import { Profile } from '../../profiles/entities/profile.entity'
import { User } from '../../users/entities/user.entity'
import { Workflow } from './workflow.entity'
import { WorkflowTaskCondition } from './workflowTaskCondition.entity'
import { WorkflowTaskResponse } from './workflowTaskResponse.entity'

@Table({
  modelName: 'WorkflowTask',
  tableName: 'workflow_tasks',
  underscored: true,
  version: false,
  indexes: [
    {
      unique: true,
      fields: ['workflow_id', 'order']
    }
  ]
})
export class WorkflowTask extends Model<WorkflowTask> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the task record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowId: number

  @Column({
    allowNull: false,
    type: DataType.STRING(80)
  })
  title: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  order: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  profileId: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  userId?: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  userAlternateId?: number

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  allowApproverFromHierarchy: boolean

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  hierarchyLevel?: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  deadline: number

  @HasOne(() => Workflow, { sourceKey: 'workflowId', foreignKey: 'id' })
  workflow: Workflow

  @HasOne(() => Profile, { sourceKey: 'profileId', foreignKey: 'id' })
  profile: Profile

  @HasOne(() => User, { sourceKey: 'userId', foreignKey: 'id' })
  user: User

  @HasOne(() => User, { sourceKey: 'userAlternateId', foreignKey: 'id' })
  userAlternate: User

  @HasMany(() => WorkflowTaskCondition, {
    as: 'conditions',
    sourceKey: 'id',
    foreignKey: 'workflowTaskId'
  })
  conditions: WorkflowTaskCondition[]

  @HasMany(() => WorkflowTaskResponse, {
    as: 'responses',
    sourceKey: 'id',
    foreignKey: 'workflowTaskId'
  })
  responses: WorkflowTaskResponse[]
}
