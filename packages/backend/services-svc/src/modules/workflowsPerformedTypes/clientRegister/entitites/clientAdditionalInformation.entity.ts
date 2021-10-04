/* eslint-disable import/no-cycle */
import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  HasOne
} from 'sequelize-typescript'

import { ClientAdditionalInformationBankReference } from './clientAdditionalInformationBankReference.entity'
import { ClientAdditionalInformationCommercialReference } from './clientAdditionalInformationCommercialReference.entity'
import { ClientAdditionalInformationCounter } from './clientAdditionalInformationCounter.entity'
import { ClientAdditionalInformationParticipationCompany } from './clientAdditionalInformationParticipationCompany.entity'
import { ClientAdditionalInformationRevenue } from './clientAdditionalInformationRevenue.entity'

@Table({
  modelName: 'ClientAdditionalInformation',
  tableName: 'client_additional_information',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientAdditionalInformation extends Model<ClientAdditionalInformation> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientAdditionalInformation'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  initialContact: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  numbersOfEmployes: number

  @Column({
    type: DataType.DECIMAL(19,4),
    allowNull: true
  })
  suggestedLimit: number

  @Column({
    type: DataType.DECIMAL(19,4),
    allowNull: true
  })
  shareCapital: number

  @Column({
    type: DataType.STRING('MAX'),
    allowNull: true
  })
  observation: string

  @HasMany(() => ClientAdditionalInformationBankReference, {
    foreignKey: 'clientAdditionalInformationId',
    sourceKey: 'id'
  })
  bankReferences: ClientAdditionalInformationBankReference[]

  @HasMany(() => ClientAdditionalInformationCommercialReference, {
    sourceKey: 'id',
    foreignKey: 'clientAdditionalInformationId'
  })
  commercialReferences: ClientAdditionalInformationCommercialReference[]

  @HasOne(() => ClientAdditionalInformationCounter, {
    foreignKey: 'clientAdditionalInformationId',
    sourceKey: 'id'
  })
  counter: ClientAdditionalInformationCounter

  @HasMany(() => ClientAdditionalInformationParticipationCompany, {
    foreignKey: 'clientAdditionalInformationId',
    sourceKey: 'id'
  })
  participationsCompany: ClientAdditionalInformationParticipationCompany[]

  @HasMany(() => ClientAdditionalInformationRevenue, {
    foreignKey: 'clientAdditionalInformationId',
    sourceKey: 'id'
  })
  revenues: ClientAdditionalInformationRevenue[]
}
