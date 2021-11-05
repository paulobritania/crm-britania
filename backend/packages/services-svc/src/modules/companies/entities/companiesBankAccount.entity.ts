import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

import { Bank } from '../../banks/entities/bank.entity'
import { User } from '../../users/entities/user.entity'
import { Company } from './company.entity'

@Table({
  modelName: 'CompaniesBankAccount',
  tableName: 'companies_bank_account',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class CompaniesBankAccount extends Model<CompaniesBankAccount> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the CompaniesBankAccount record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  companyId: number

  @Column({
    type: DataType.STRING(3),
    allowNull: false
  })
  bankCode: string

  @Column({
    type: DataType.STRING(10),
    allowNull: false
  })
  agency: string

  @Column({
    type: DataType.STRING(10),
    allowNull: false
  })
  account: string

  @Column({
    type: DataType.STRING(500),
    allowNull: true
  })
  note: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  updatedBy: number;
  

  @HasOne(() => Bank, { sourceKey: 'bankCode', foreignKey: 'code' })
  bank: Bank

  @HasOne(() => Company, { sourceKey: 'companyId', foreignKey: 'id' })
  company: Company

  @HasOne(() => User, { sourceKey: 'createdBy', foreignKey: 'id' })
  createdByUser: User

  @HasOne(() => User, { sourceKey: 'updatedBy', foreignKey: 'id' })
  updatedByUser: User;

}
