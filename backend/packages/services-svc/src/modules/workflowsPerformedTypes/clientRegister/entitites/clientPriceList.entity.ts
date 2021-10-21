import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'ClientPriceList',
  tableName: 'client_price_list',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientPriceList extends Model<ClientPriceList> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientPriceList'
  })
  id: number

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  establishment128CdEsCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  establishment22Code: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  establishment15Code: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  establishment31ManausCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  establishment31AgScCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  establishment31AgSpCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  establishment305CdPe: string
}
