/* eslint-disable import/no-cycle */
import {
  Column,
  DataType,
  BelongsTo,
  Table,
  Model} from 'sequelize-typescript'

import { Buyer } from './buyer.entity'

@Table({
  modelName: 'BuyerLineFamily',
  tableName: 'buyers_lines_families',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false,
})
export class BuyerLineFamily extends Model<BuyerLineFamily> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the BuyerLineFamily record'
  })
  id: number

  @Column({
    type: DataType.STRING(12),
    allowNull: false
  })
  familyCode: string

  @Column({
    type: DataType.STRING(200),
    allowNull: false
  })
  familyDescription: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  lineCode: number

  @Column({
    type: DataType.STRING(200),
    allowNull: false
  })
  lineDescription: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  regionalManagerCode: number

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  regionalManagerDescription: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  responsibleCode: number;

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  responsibleDescription: string;

  @BelongsTo(() => Buyer, { foreignKey: 'buyerId', targetKey: 'id' })
  buyer: Buyer
}
