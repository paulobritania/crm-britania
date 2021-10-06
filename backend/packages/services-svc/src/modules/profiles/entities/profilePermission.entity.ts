import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { Permission } from '../../permissions/entities/permission.entity'

@Table({
  modelName: 'ProfilePermission',
  tableName: 'profile_permissions',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class ProfilePermission extends Model<ProfilePermission> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the profile_permissions record'
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
  permissionId: number

  @HasOne(() => Permission, { sourceKey: 'permissionId', foreignKey: 'id' })
  permission: Permission
}
