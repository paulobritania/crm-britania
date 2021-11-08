import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

import { User } from '../../users/entities/user.entity'

@Table({
  modelName: 'Company',
  tableName: 'companies',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Company extends Model<Company> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Companies record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING(150)
  })
  name: string

  @Column({
    allowNull: false,
    type: DataType.STRING(14)
  })
  cnpj: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  updatedBy: number

  @HasOne(() => User, { sourceKey: 'createdBy', foreignKey: 'id' })
  createdByUser: User

  @HasOne(() => User, { sourceKey: 'updatedBy', foreignKey: 'id' })
  updatedByUser: User
}
