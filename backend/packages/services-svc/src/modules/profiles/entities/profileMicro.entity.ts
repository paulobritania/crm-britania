import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

import { Field } from '../../fields/entities/field.entity'

@Table({
  modelName: 'ProfileMicro',
  tableName: 'profile_micros',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class ProfileMicro extends Model<ProfileMicro> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the profile_micros record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  profileId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  fieldId: number

  @HasOne(() => Field, { sourceKey: 'fieldId', foreignKey: 'id' })
  field: Field

}
