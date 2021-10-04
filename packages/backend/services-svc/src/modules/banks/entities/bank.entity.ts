import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
  modelName: 'Bank',
  tableName: 'banks',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})
export class Bank extends Model<Bank> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    type: DataType.STRING(10),
    comment: 'The identifier for the Banks record'
  })
  code: string

  @Column({
    allowNull: false,
    type: DataType.STRING(100)
  })
  description: string
}
