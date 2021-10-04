import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  modelName: 'WorkflowClientUpdateAddress',
  tableName: 'workflow_client_update_address',
  underscored: true,
  version: false,
  timestamps: false
})
export class WorkflowClientUpdateAddress extends Model<WorkflowClientUpdateAddress> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow client update record'
  })
  id: number

  @Column({
    allowNull: true,
    type: DataType.STRING(10)
  })
  zipCode: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  publicPlace: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  number: number

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  district: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  complement: string

  @Column({
    allowNull: false,
    type: DataType.STRING(40)
  })
  city: string

  @Column({
    allowNull: false,
    type: DataType.STRING(2)
  })
  state: string

  @Column({
    allowNull: false,
    type: DataType.STRING(40)
  })
  country: string

  @Column({
    allowNull: true,
    type: DataType.STRING(11)
  })
  phone: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  email: string
}
