/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { ClientAdditionalInformation } from './clientAdditionalInformation.entity'

@Table({
  modelName: 'ClientAdditionalInformationRevenue',
  tableName: 'client_additional_information_revenues',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientAdditionalInformationRevenue extends Model<ClientAdditionalInformationRevenue> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientAdditionalInformationRevenue'
  })
  id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  month: number

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  year: number

  @Column({
    type: DataType.DECIMAL(19,4),
    allowNull: true
  })
  value: number

  @BelongsTo(() => ClientAdditionalInformation, {
    foreignKey: 'clientAdditionalInformationId',
    targetKey: 'id'
  })
  additionalInformation: ClientAdditionalInformation
}
