import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'ClientRegistrationInformation',
  tableName: 'client_registration_information',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientRegistrationInformation extends Model<ClientRegistrationInformation> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientFinancial'
  })
  id: number

  @Column({
    type: DataType.NUMBER,
    allowNull: true
  })
  representativeCode: number

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  representativeName: string
}
