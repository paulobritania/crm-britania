import { Module, HttpModule } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { DatabaseProvider } from '../../database/database.provider'
import { ClientsModule } from '../clients/clients.module'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { Address } from '../address/entities/address.entity'
import { HierarchyModule } from '../hierarchy/hierarchy.module'
import { User } from '../users/entities/user.entity'
import { UserRepresentativeCode } from '../users/entities/userRepresentativeCode.entity'
import { BuyersController } from './buyers.controller'
import { BuyersService } from './buyers.service'
import { Buyer } from './entities/buyer.entity'
import { BuyerAddress } from './entities/buyerAddress.entity'
import { BuyerLineFamily } from './entities/buyerLineFamily.entity'

@Module({
  imports: [
    HttpModule,
    SequelizeModule.forFeature([
      Address,
      Buyer,
      BuyerAddress,
      BuyerLineFamily,
      Hierarchy,
      User,
      UserRepresentativeCode
    ]),
    ClientsModule,
    HierarchyModule
  ],
  controllers: [BuyersController],
  exports: [BuyersService],
  providers: [
    DatabaseProvider,
    BuyersService
  ]
})
export class BuyersModule {}
