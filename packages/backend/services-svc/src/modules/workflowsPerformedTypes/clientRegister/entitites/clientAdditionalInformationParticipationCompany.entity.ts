/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { ClientAdditionalInformation } from './clientAdditionalInformation.entity'

@Table({
  modelName: 'ClientAdditionalInformationParticipationCompany',
  tableName: 'client_additional_information_participation_company',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientAdditionalInformationParticipationCompany extends Model<ClientAdditionalInformationParticipationCompany> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientAdditionalInformationParticipation'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  name: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  city: string

  @Column({
    type: DataType.STRING(2),
    allowNull: true
  })
  state: string

  @Column({
    type: DataType.STRING(30),
    allowNull: true
  })
  branch: string

  @Column({
    type: DataType.NUMBER,
    allowNull: true
  })
  participationPercent: number

  @BelongsTo(() => ClientAdditionalInformation, {
    foreignKey: 'clientAdditionalInformationId',
    targetKey: 'id'
  })
  additionalInformation: ClientAdditionalInformation
}
