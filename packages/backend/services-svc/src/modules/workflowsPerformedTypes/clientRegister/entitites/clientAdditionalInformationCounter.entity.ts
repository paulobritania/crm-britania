/* eslint-disable import/no-cycle */
import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  HasMany
} from 'sequelize-typescript'

import { ClientAdditionalInformation } from './clientAdditionalInformation.entity'
import { ClientAdditionalInformationCounterValue } from './clientAdditionalInformationCounterValue.entity'

@Table({
  modelName: 'ClientAdditionalInformationCounter',
  tableName: 'client_additional_information_counter',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientAdditionalInformationCounter extends Model<ClientAdditionalInformationCounter> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientAdditionalInformationCounter'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  counter: string

  @Column({
    type: DataType.STRING(11),
    allowNull: true
  })
  counterPhone: string

  @Column({
    type: DataType.STRING(10),
    allowNull: true
  })
  counterCrc: string

  @BelongsTo(() => ClientAdditionalInformation, {
    targetKey: 'id',
    foreignKey: 'clientAdditionalInformationId'
  })
  additionalInformation: ClientAdditionalInformation

  @HasMany(() => ClientAdditionalInformationCounterValue, {
    foreignKey: 'clientAdditionalInformationCounterId',
    sourceKey: 'id'
  })
  values: ClientAdditionalInformationCounterValue[]
}
