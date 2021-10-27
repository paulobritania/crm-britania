import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'ClientFinancial',
  tableName: 'client_financial',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientFinancial extends Model<ClientFinancial> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientFinancial'
  })
  id: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  issueBankSlip: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  generatesDebitNotice: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  calculatesFine: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  receivesNfe: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  simpleClient: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  receivesSciInformation: boolean

  @Column({
    type: DataType.STRING(5),
    allowNull: true
  })
  standardIncome: string

  @Column({
    type: DataType.STRING(8),
    allowNull: true
  })
  carrier: string

  @Column({
    type: DataType.STRING(5),
    allowNull: true
  })
  bankInstruction: string
}
