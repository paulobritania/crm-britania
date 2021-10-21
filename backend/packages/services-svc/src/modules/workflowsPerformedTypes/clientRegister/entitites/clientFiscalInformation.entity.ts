import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'ClientFiscalInformation',
  tableName: 'client_fiscal_information',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientFiscalInformation extends Model<ClientFiscalInformation> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientFiscalInformation'
  })
  id: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  specialTaxSubstitutionRegime: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  clientFromMatoGrosso: boolean

  @Column({
    type: DataType.STRING(30),
    allowNull: true
  })
  taxRegime: string
}
