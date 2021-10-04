/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { ClientAdditionalInformation } from './clientAdditionalInformation.entity'

@Table({
  modelName: 'ClientAdditionalInformationCommercialReference',
  tableName: 'client_additional_information_commercial_reference',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientAdditionalInformationCommercialReference extends Model<ClientAdditionalInformationCommercialReference> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment:
      'The identifier for the ClientAdditionalInformationCommercialReference'
  })
  id: number

  @Column({
    type: DataType.STRING(14),
    allowNull: true
  })
  suframa: string

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  name: string

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
