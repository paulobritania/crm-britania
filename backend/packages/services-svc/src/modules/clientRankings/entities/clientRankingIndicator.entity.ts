import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  modelName: 'ClientRankingIndicator',
  tableName: 'client_ranking_indicators',
  underscored: true,
  version: false,
  timestamps: false
})
export class ClientRankingIndicator extends Model<ClientRankingIndicator> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the client ranking indicator record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  clientTotvsCode: number

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(8, 3)
  })
  growth: number

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(8, 3)
  })
  devolution: number

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(8, 3)
  })
  productIntroduction: number

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(8, 3)
  })
  paymentTerms: number

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  createdAt: string
}
