import {
  Column,
  DataType,
  HasMany,
  BelongsTo,
  Table,
  Model,
  HasOne
} from 'sequelize-typescript'

import { File } from '../../files/entities/file.entity'
import { User } from '../../users/entities/user.entity'
// eslint-disable-next-line import/no-cycle
import { BuyerAddress } from './buyerAddress.entity'
// eslint-disable-next-line import/no-cycle
import { BuyerLineFamily } from './buyerLineFamily.entity'
@Table({
  modelName: 'Buyer',
  tableName: 'buyers',
  underscored: true,
  version: false,
  timestamps: false
})
export class Buyer extends Model<Buyer> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Buyer record'
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(11)
  })
  cpf: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(200)
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(200)
  })
  category: string;

  @Column({
    type: DataType.STRING(3),
    allowNull: true
  })
  voltage: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true
  })
  role: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: true
  })
  birthday: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  email: string;

  @Column({
    type: DataType.STRING(12),
    allowNull: true
  })
  telephone: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  active: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  clientTotvsCode: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  responsibleCode: number;

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  responsibleDescription: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  imageId: number;

  @HasMany(() => BuyerLineFamily, { foreignKey: 'buyerId', sourceKey: 'id' })
  buyerLinesFamilies: BuyerLineFamily[];

  @HasMany(() => BuyerAddress, { foreignKey: 'idBuyers', sourceKey: 'id' })
  buyerAddress: BuyerAddress[];

  @HasOne(() => File, { sourceKey: 'imageId', foreignKey: 'id' })
  ranking: File

  @BelongsTo(() => User, {
    foreignKey: 'createdBy',
    targetKey: 'id'
  })
  userCreated: User;

  @BelongsTo(() => User, {
    foreignKey: 'updatedBy',
    targetKey: 'id'
  })
  userUpdated: User;
}
