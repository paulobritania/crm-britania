import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'ClientCadastralCheck',
  tableName: 'client_cadastral_check',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientCadastralCheck extends Model<ClientCadastralCheck> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientCadastralCheck'
  })
  id: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  cadastralCheck: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  newClient: boolean

  @Column({
    type: DataType.STRING(1),
    allowNull: true
  })
  riskClass: string
}
