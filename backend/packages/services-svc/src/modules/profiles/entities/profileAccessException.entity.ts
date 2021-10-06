import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

import { Access } from '../../accesses/entities/access.entity'
import { Permission } from '../../permissions/entities/permission.entity'

@Table({
  modelName: 'ProfileAccessException',
  tableName: 'profile_access_exceptions',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class ProfileAccessException extends Model<ProfileAccessException> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the profile_access_exceptions record'
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

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  accessId: number

  @HasOne(() => Permission, { sourceKey: 'permissionId', foreignKey: 'id' })
  permission: Permission

  @HasOne(() => Access, { sourceKey: 'accessId', foreignKey: 'id' })
  access: Access

}
