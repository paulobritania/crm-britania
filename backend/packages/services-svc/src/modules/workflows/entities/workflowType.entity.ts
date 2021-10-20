import {
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript'

@Table({
  modelName: 'WorkflowType',
  tableName: 'workflow_types',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['code']
    }
  ]
})
export class WorkflowType extends Model<WorkflowType> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow_types record'
  })
  id: number

  @Column({
    unique: true,
    allowNull: false,
    type: DataType.STRING(10)
  })
  code: string

  @Column({
    allowNull: false,
    type: DataType.STRING(50)
  })
  description: string
}
