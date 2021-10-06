/* eslint-disable import/no-cycle */
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript'

import { Field } from '../../fields/entities/field.entity'
import { ProfileAccess } from '../../profiles/entities/profileAccess.entity'

@Table({
  modelName: 'Access',
  tableName: 'accesses',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Access extends Model<Access> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Accesses record'
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

  @HasMany(() => ProfileAccess, { sourceKey: 'id', foreignKey: 'accessId' })
  access: ProfileAccess[]

  @HasMany(() => Field, { sourceKey: 'id', foreignKey: 'accessId' })
  fields: Field[]
}
