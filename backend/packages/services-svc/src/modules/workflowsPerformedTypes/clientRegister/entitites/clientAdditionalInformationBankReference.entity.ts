/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { ClientAdditionalInformation } from './clientAdditionalInformation.entity'

@Table({
  modelName: 'ClientAdditionalInformationBankReference',
  tableName: 'client_additional_information_bank_reference',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientAdditionalInformationBankReference extends Model<ClientAdditionalInformationBankReference> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientAdditionalInformationBankReference'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  name: string

  @Column({
    type: DataType.STRING(4),
    allowNull: true
  })
  agency: string

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  account: string

  @Column({
    type: DataType.STRING(11),
    allowNull: true
  })
  phone: string

  @BelongsTo(() => ClientAdditionalInformation, {
    foreignKey: 'clientAdditionalInformationId',
    targetKey: 'id'
  })
  additionalInformation: ClientAdditionalInformation
}
