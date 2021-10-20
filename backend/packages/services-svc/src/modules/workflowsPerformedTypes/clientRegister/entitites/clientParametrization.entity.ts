import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'ClientParametrization',
  tableName: 'client_parametrization',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientParametrization extends Model<ClientParametrization> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientParametrization'
  })
  id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  clientGroupCode: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  shortName: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  parentCompanyCode: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  parentCompany: string

  @Column({
    type: DataType.STRING('MAX'),
    allowNull: true
  })
  historic: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  intermediary: boolean
}
