import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { Access } from '../../accesses/entities/access.entity'

@Table({
  modelName: 'ProfileAccess',
  tableName: 'profile_access',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class ProfileAccess extends Model<ProfileAccess> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the profile_access record'
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
  accessId: number

  @HasOne(() => Access, { sourceKey: 'accessId', foreignKey: 'id' })
  access: Access
}
