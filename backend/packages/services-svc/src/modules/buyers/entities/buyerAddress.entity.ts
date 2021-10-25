import { Table, Model, Column, DataType, HasOne } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { Address } from '../../address/entities/address.entity'
// eslint-disable-next-line import/no-cycle
import { Buyer } from './buyer.entity'

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
    type: DataType.INTEGER
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
  deliveryAddress: number;

  @HasOne(() => Buyer, { sourceKey: 'idBuyers', foreignKey: 'id' })
  buyer: Buyer;

  @HasOne(() => Address, { sourceKey: 'idAddress', foreignKey: 'id' })
  address: Address;
}