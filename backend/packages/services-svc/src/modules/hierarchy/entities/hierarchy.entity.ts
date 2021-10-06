/* eslint-disable import/no-cycle */
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'

import { UserRepresentativeCode } from '../../users/entities/userRepresentativeCode.entity'

@Table({
  modelName: 'Hierarchy',
  tableName: 'hierarchy',
  underscored: true,
  version: false,
  timestamps: false
})
export class Hierarchy extends Model<Hierarchy> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the hierarchy record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  clientCode: number

  @Column({
    allowNull: false,
    type: DataType.STRING(50)
  })
  clientDesc: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  lineCode: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  parentLineCode: number

  @Column({
    allowNull: true,
    type: DataType.STRING(12)
  })
  materialFamilyCode: string

  @Column({
    allowNull: true,
    type: DataType.STRING(16)
  })
  commercialProductCode: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  memberClassCode: number

  @Column({
    allowNull: false,
    type: DataType.STRING(60)
  })
  memberClassDesc: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  memberCode: number

  @Column({
    allowNull: false,
    type: DataType.STRING(40)
  })
  memberDesc: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  memberLevel: number

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  lastMember: number

  @HasMany(() => UserRepresentativeCode, {
    sourceKey: 'memberCode',
    foreignKey: 'code'
  })
  userRepresentativeCodes: UserRepresentativeCode[]
}
