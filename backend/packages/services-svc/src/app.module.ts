import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { SequelizeModule } from '@nestjs/sequelize'

import { JwtStrategy } from '@britania-crm-com/auth-utils'
import { NotificationsUtilsModule } from '@britania-crm-com/notifications-utils'

import { CronsModule } from './crons/crons.module'
import { DatabaseModelList } from './database/database.models'
import { AccessesModule } from './modules/accesses/accesses.module'
import { BanksModule } from './modules/banks/banks.module'
import { BuyersModule } from './modules/buyers/buyers.module'
import { ClientRankingsModule } from './modules/clientRankings/clientRankings.module'
import { ClientsModule } from './modules/clients/clients.module'
import { CompaniesModule } from './modules/companies/companies.module'
import { ConfigurationsModule } from './modules/configurations/configurations.module'
import { EstablishmentsModule } from './modules/establishments/establishments.module'
import { FanModule } from './modules/fan/fan.module'
import { FieldsModule } from './modules/fields/fields.module'
import { FilesModule } from './modules/files/files.module'
import { FinancialModule } from './modules/financial/financial.module'
import { HierarchyModule } from './modules/hierarchy/hierarchy.module'
import { LinesModule } from './modules/lines/lines.module'
import { MessageBoardsModule } from './modules/messageBoards/messageBoards.module'
import { PermissionsModule } from './modules/permissions/permissions.module'
import { ProductModule } from './modules/products/product.module'
import { ProfilesModule } from './modules/profiles/profiles.module'
import { ReportsModule } from './modules/reports/reports.module'
import { RepresentativesModule } from './modules/representatives/representatives.module'
import { SettingsModule } from './modules/settings/settings.module'
import { StickyNotesModule } from './modules/stickyNotes/stickyNotes.module'
import { UsersModule } from './modules/users/users.module'
import { VpcModule } from './modules/vpc/vpc.module'
import { WorkflowsModule } from './modules/workflows/workflows.module'
import { WorkflowPerformedModule } from './modules/workflowsPerformed/workflowPerformed.module'
import { ClientRegisterModule } from './modules/workflowsPerformedTypes/clientRegister/clientRegister.module'
import { WorkflowPerformedTypesModule } from './modules/workflowsPerformedTypes/workflowPerformedTypes.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    StickyNotesModule,
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '1433', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [...DatabaseModelList]
    }),
    AccessesModule,
    BuyersModule,
    ClientRankingsModule,
    ClientsModule,
    CompaniesModule,
    ConfigurationsModule,
    EstablishmentsModule,
    FieldsModule,
    FilesModule,
    FinancialModule,
    LinesModule,
    PermissionsModule,
    ProfilesModule,
    MessageBoardsModule,
    SettingsModule,
    UsersModule,
    WorkflowPerformedTypesModule,
    RepresentativesModule,
    WorkflowsModule,
    WorkflowPerformedModule,
    VpcModule,
    ClientRegisterModule,
    NotificationsUtilsModule,
    FanModule,
    HierarchyModule,
    ReportsModule,
    ProductModule,
    CronsModule,
    BanksModule
  ],
  providers: [JwtStrategy]
})
export class AppModule {}
