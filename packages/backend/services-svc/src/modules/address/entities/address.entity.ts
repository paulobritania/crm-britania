import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  modelName: 'Address',
  tableName: 'address',
  underscored: true,
  version: false,
  timestamps: false
})
export class Address extends Model<Address> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the address record'
  })
  id: number

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  street: string

  @Column({
    allowNull: true,
    type: DataType.STRING(10)
  })
  number: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  complement: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  district: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  city: string

  @Column({
    allowNull: true,
    type: DataType.STRING(2)
  })
  state: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  country: string

  @Column({
    allowNull: true,
    type: DataType.STRING(8)
  })
  cep: string

}
