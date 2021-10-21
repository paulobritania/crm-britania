/* eslint-disable import/no-cycle */
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { Field } from '../../fields/entities/field.entity'

@Table({
  modelName: 'WorkflowTaskCondition',
  tableName: 'workflow_task_conditions',
  underscored: true,
  version: false,
  indexes: [
    {
      unique: true,
      fields: ['workflow_task_id', 'order']
    }
  ]
})
export class WorkflowTaskCondition extends Model<WorkflowTaskCondition> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the condition record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowTaskId: number

  @Column({
    allowNull: false,
    type: DataType.STRING(50)
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
  fieldId: number

  @Column({
    allowNull: false,
    type: DataType.STRING(10)
  })
  comparisonSymbol: string

  @Column({
    allowNull: false,
    type: DataType.STRING(255)
  })
  comparisonValue: string

  @HasOne(() => Field, { sourceKey: 'fieldId', foreignKey: 'id' })
  field: Field
}
