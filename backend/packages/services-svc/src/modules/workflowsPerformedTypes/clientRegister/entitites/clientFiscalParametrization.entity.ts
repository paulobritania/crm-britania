import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'ClientFiscalParametrization',
  tableName: 'client_fiscal_parametrization',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientFiscalParametrization extends Model<ClientFiscalParametrization> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientFiscalParametrization'
  })
  id: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  doNotRetainIcms: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  icmsSubstitute: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  icmsTaxpayer: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  optingSuspensionsIpi: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  buysPhilco: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  withholdTax: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  retentionAgent: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  fullNonAcumulative: boolean

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  expirationDate: Date
}
