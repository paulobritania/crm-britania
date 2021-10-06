import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table({
  modelName: 'BuyerAddress',
  tableName: 'buyers_address',
  underscored: true,
  version: false,
  timestamps: false
})
export class BuyerAddress extends Model<BuyerAddress> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the BuyerAddress record'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  street: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  number: number

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  district: string

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  complement: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  city: string

  @Column({
    type: DataType.STRING(2),
    allowNull: true
  })
  uf: string

  @Column({
    type: DataType.STRING(8),
    allowNull: true
  })
  cep: string
}
