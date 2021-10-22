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
    autoIncrement: false,
    type: DataType.INTEGER,
  })
  idBuyers: number;

  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the BuyerAddress record'
  })
  idAddress: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  addressType: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  deliveryAddress: number
}