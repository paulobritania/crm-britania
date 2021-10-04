/* eslint-disable import/no-cycle */
import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

import { Access } from '../../accesses/entities/access.entity'

@Table({
  modelName: 'Field',
  tableName: 'fields',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})
export class Field extends Model<Field> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Fields record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name: string

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true
  })
  alias: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  accessId: number

  @HasOne(() => Access, { sourceKey: 'accessId', foreignKey: 'id' })
  access: Access

}
