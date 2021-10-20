/* eslint-disable import/no-cycle */
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript'

import { UserProfile } from '../../users/entities/userProfile.entity'
import { WorkflowTask } from '../../workflows/entities/workflowTask.entity'
import { ProfileAccess } from './profileAccess.entity'
import { ProfileAccessException } from './profileAccessException.entity'
import { ProfileMicro } from './profileMicro.entity'
import { ProfilePermission } from './profilePermission.entity'

@Table({
  modelName: 'Profile',
  tableName: 'profiles',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})
export class Profile extends Model<Profile> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Profiles record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING(30),
    unique: true
  })
  name: string

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  active: boolean

  @HasMany(() => ProfilePermission, { sourceKey: 'id', foreignKey: 'profileId' })
  permissions: ProfilePermission[]

  @HasMany(() => ProfileAccess, { sourceKey: 'id', foreignKey: 'profileId' })
  accesses: ProfileAccess[]

  @HasMany(() => ProfileMicro, { sourceKey: 'id', foreignKey: 'profileId' })
  micros: ProfileMicro[]

  @HasMany(() => ProfileAccessException, { sourceKey: 'id', foreignKey: 'profileId' })
  exceptions: ProfileAccessException[]

  @HasMany(() => UserProfile, { as: 'userProfile', sourceKey: 'id', foreignKey: 'profileId' })
  userProfiles: UserProfile[];

  @HasMany(() => WorkflowTask, { sourceKey: 'id', foreignKey: 'profileId' })
  workflowTasks: WorkflowTask[];
}
