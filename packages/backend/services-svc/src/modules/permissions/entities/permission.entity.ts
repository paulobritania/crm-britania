import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { ProfilePermission } from '../../profiles/entities/profilePermission.entity'

@Table({
  modelName: 'Permission',
  tableName: 'permissions',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Permission extends Model<Permission> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Permissions record'
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

  @HasMany(() => ProfilePermission, { sourceKey: 'id', foreignKey: 'permissionId' })
  permission: ProfilePermission

}
