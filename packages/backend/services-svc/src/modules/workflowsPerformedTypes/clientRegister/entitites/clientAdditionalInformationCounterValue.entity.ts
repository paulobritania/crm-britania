/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { ClientAdditionalInformationCounter } from './clientAdditionalInformationCounter.entity'

@Table({
  modelName: 'ClientAdditionalInformationCounterValue',
  tableName: 'client_additional_information_counter_values',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientAdditionalInformationCounterValue extends Model<ClientAdditionalInformationCounterValue> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientAdditionalInformationCounter'
  })
  id: number

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  value: number

  @Column({
    type: DataType.STRING(30),
    allowNull: true
  })
  description: string

  @Column({
    type: DataType.STRING(15),
    allowNull: true
  })
  localization: string

  @BelongsTo(() => ClientAdditionalInformationCounter, {
    foreignKey: 'clientAdditionalInformationCounterId',
    targetKey: 'id'
  })
  counter: ClientAdditionalInformationCounter
}
