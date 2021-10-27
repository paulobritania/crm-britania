import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

import { File } from '../../files/entities/file.entity'

@Table({
  modelName: 'Setting',
  tableName: 'settings',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Setting extends Model<Setting> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Settings record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true
  })
  param: string

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  content: string

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  fileId: number

  @HasOne(() => File, { sourceKey: 'fileId', foreignKey: 'id' })
  file: File
}
