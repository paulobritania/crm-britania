import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { User } from '../../users/entities/user.entity'

@Table({
  modelName: 'File',
  tableName: 'files',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class File extends Model<File> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Files record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  filename: string

  @Column({
    allowNull: false,
    type: DataType.STRING(80)
  })
  contentType: string

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  path: string

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  createdBy: number

  @HasOne(() => User, { sourceKey: 'createdBy', foreignKey: 'id' })
  user: User
}
