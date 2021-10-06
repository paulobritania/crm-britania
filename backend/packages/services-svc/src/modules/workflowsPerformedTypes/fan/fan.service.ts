import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
  HttpException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction, Sequelize, Model } from 'sequelize'

import { File } from '../../files/entities/file.entity'
import { FilesService } from '../../files/files.service'
import { Hierarchy } from '../../hierarchy/entities/hierarchy.entity'
import { LinesService } from '../../lines/lines.service'
import { WorkflowTypeEnum } from '../../workflows/enum/workflowType.enum'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../../workflowsPerformed/workflowPerformed.service'
import { CreateWorkflowFanDto } from './dto/create/createWorkflowFan.dto'
import { CreateWorkflowFanDocumentDto } from './dto/create/createWorkflowFanDocument.dto'
import { CreateWorkflowFanFamilyDto } from './dto/create/createWorkflowFanFamily.dto'
import { CreateWorkflowFanFamilyExceptionDto } from './dto/create/createWorkflowFanFamilyException.dto'
import { CreateWorkflowFanGoalAchivementDto } from './dto/create/createWorkflowFanGoalAchivement.dto'
import { CreateWorkflowFanLineDto } from './dto/create/createWorkflowFanLine.dto'
import { CreateWorkflowFanLineExceptionDto } from './dto/create/createWorkflowFanLineException.dto'
import { CreateWorkflowFanNegotiatedFundDto } from './dto/create/createWorkflowFanNegotiatedFund.dto'
import { CreateWorkflowFanPercentageDto } from './dto/create/createWorkflowFanPercentage.dto'
import { UpdateWorkflowFanDto } from './dto/update/updateWorkflowFan.dto'
import { WorkflowFan } from './entities/workflowFan.entity'
import { WorkflowFanDocument } from './entities/workflowFanDocument.entity'
import { WorkflowFanFamily } from './entities/workflowFanFamily.entity'
import { WorkflowFanFamilyException } from './entities/workflowFanFamilyException.entity'
import { WorkflowFanGoalAchivement } from './entities/workflowFanGoalAchivement.entity'
import { WorkflowFanLine } from './entities/workflowFanLine.entity'
import { WorkflowFanLineException } from './entities/workflowFanLineException.entity'
import { WorkflowFanNegotiatedFund } from './entities/workflowFanNegotiatedFund.entity'
import { WorkflowFanPercentage } from './entities/workflowFanPercentage.entity'
import { WorkflowFanPerformed } from './entities/workflowFanPerformed.entity'
import { WorkflowFanSet } from './set/RequiredFields.set'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

@Injectable()
export class WorkflowFanService {
  constructor(
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(WorkflowPerformedService)
    private workflowPerformedService: WorkflowPerformedService,
    @Inject(FilesService) private filesService: FilesService,
    @Inject(LinesService) private linesService: LinesService,
    @InjectModel(WorkflowFan) private workflowFan: typeof WorkflowFan,
    @InjectModel(WorkflowFanNegotiatedFund)
    private workflowFanNegotiatedFund: typeof WorkflowFanNegotiatedFund,
    @InjectModel(WorkflowFanPercentage)
    private workflowFanPercentage: typeof WorkflowFanPercentage,
    @InjectModel(WorkflowFanGoalAchivement)
    private workflowFanGoalAchivement: typeof WorkflowFanGoalAchivement,
    @InjectModel(WorkflowFanPerformed)
    private workflowFanPerformed: typeof WorkflowFanPerformed,
    @InjectModel(WorkflowFanDocument)
    private workflowFanDocument: typeof WorkflowFanDocument,
    @InjectModel(WorkflowFanLine)
    private workflowFanLine: typeof WorkflowFanLine,
    @InjectModel(WorkflowFanFamily)
    private workflowFanFamily: typeof WorkflowFanFamily,
    @InjectModel(WorkflowFanLineException)
    private workflowFanLineException: typeof WorkflowFanLineException,
    @InjectModel(WorkflowFanFamilyException)
    private workflowFanFamilyException: typeof WorkflowFanFamilyException,
    @InjectModel(File) private file: typeof File,
    @InjectModel(Hierarchy) private hierarchy: typeof Hierarchy
  ) {}

  /**
   * irá criar os registros para o FAN
   * @param data CreateWorkflowFanNd
   * @param userId number
   * @param trx Transaction
   */
  async create(
    data: CreateWorkflowFanDto,
    userId: number,
    authToken: string,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    try {
      const {
        percentages,
        negotiatedFunds,
        achivements,
        lines,
        linesExceptions,
        families,
        familiesExceptions,
        ...createData
      } = data

      await this.checkFanInProgress(
        lines,
        linesExceptions,
        families,
        familiesExceptions,
        createData.parentCompanyCode,
        createData.directorship,
        authToken,
        transaction
      )
      await this.updateCurrentAndLastRecord(
        lines,
        linesExceptions,
        families,
        familiesExceptions,
        createData.parentCompanyCode,
        createData.directorship,
        authToken,
        transaction
      )

      const { isAdditive } = createData
      const identifierNumber =
        (await this.workflowFan.count({ transaction })) + 1
      const year = new Date().getFullYear().toString().slice(2)
      const number = `FAN${ isAdditive ? '-AD' : '' }${ identifierNumber
        .toString()
        .padStart(5, '0') }/${ year }`

      const { id: workflowFanId } = await this.workflowFan.create(
        {
          ...createData,
          active: true,
          currentRegister: true,
          number,
          ...(isAdditive
            ? {
                workflowFanId: createData.workflowFanId
              }
            : { workflowFanId: null }),
          createdBy: userId,
          updatedBy: userId
        },
        { transaction }
      )
      if (lines[0])
        await this.multipleCreateInFan(
          this.workflowFanLine,
          lines,
          workflowFanId,
          transaction
        )
      if (linesExceptions[0])
        await this.multipleCreateInFan(
          this.workflowFanLineException,
          linesExceptions,
          workflowFanId,
          transaction
        )
      if (families[0])
        await this.multipleCreateInFan(
          this.workflowFanFamily,
          families,
          workflowFanId,
          transaction
        )
      if (familiesExceptions[0])
        await this.multipleCreateInFan(
          this.workflowFanFamilyException,
          familiesExceptions,
          workflowFanId,
          transaction
        )
      if (percentages[0])
        await this.multipleCreateInFan(
          this.workflowFanPercentage,
          percentages,
          workflowFanId,
          transaction
        )
      if (negotiatedFunds[0])
        await this.multipleCreateInFan(
          this.workflowFanNegotiatedFund,
          negotiatedFunds,
          workflowFanId,
          transaction
        )
      if (achivements[0])
        await this.multipleCreateInFan(
          this.workflowFanGoalAchivement,
          achivements,
          workflowFanId,
          transaction
        )
      if (!trx) await transaction.commit()
      return workflowFanId
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao cadastrar o FAN'
      )
    }
  }

  /**
   * irá verificar atualizar os registro
   * atual e último do FAN
   * @param lines: CreateWorkflowFanLineDto[],
     @param families: CreateWorkflowFanFamilyDto[],
     @param familiesExceptions: CreateWorkflowFanFamilyExceptionDto[],
     @param clientCode: number,
     @param transaction: Transaction
   */
  async updateCurrentAndLastRecord(
    lines: CreateWorkflowFanLineDto[],
    linesExceptions: CreateWorkflowFanLineExceptionDto[],
    families: CreateWorkflowFanFamilyDto[],
    familiesExceptions: CreateWorkflowFanFamilyExceptionDto[],
    clientCode: number,
    directorshipCode: number,
    authToken: string,
    transaction: Transaction
  ): Promise<void> {
    const lastFan = await this.getFanByHierarchy(
      {
        lastRegister: true
      },
      lines,
      linesExceptions,
      families,
      familiesExceptions,
      clientCode,
      directorshipCode,
      authToken,
      transaction
    )
    if (lastFan)
      await lastFan.update(
        {
          lastRegister: false,
          currentRegister: false
        },
        { transaction }
      )
    const currentFan = await this.getFanByHierarchy(
      {
        currentRegister: true
      },
      lines,
      linesExceptions,
      families,
      familiesExceptions,
      clientCode,
      directorshipCode,
      authToken,
      transaction
    )
    if (currentFan)
      await currentFan.update(
        {
          currentRegister: false,
          lastRegister: true
        },
        { transaction }
      )
  }

  /**
   * irá verificar se já existe um FAN em vigência
   * de acordo a hierarquia
   * @param lines: CreateWorkflowFanLineDto[],
     @param families: CreateWorkflowFanFamilyDto[],
     @param familiesExceptions: CreateWorkflowFanFamilyExceptionDto[],
     @param clientCode: number,
     @param transaction: Transaction
   */
  async checkFanInProgress(
    lines: CreateWorkflowFanLineDto[],
    linesExceptions: CreateWorkflowFanLineExceptionDto[],
    families: CreateWorkflowFanFamilyDto[],
    familiesExceptions: CreateWorkflowFanFamilyExceptionDto[],
    clientCode: number,
    directorshipCode: number,
    authToken: string,
    transaction: Transaction,
    notId = 0
  ): Promise<void> {
    const fan = await this.getFanByHierarchy(
      {
        _onlyActive: true,
        validateDate: true,
        _notId: notId
      },
      lines,
      linesExceptions,
      families,
      familiesExceptions,
      clientCode,
      directorshipCode,
      authToken,
      transaction
    )
    if (fan)
      throw new BadRequestException(
        'Já existe um FAN em vigência para a hierarquia selecionada'
      )
  }

  /**
   * irá retornar o FAN de acordo com a hierarquia
   * validando linhas x famílias
   * @param lines CreateWorkflowFanLineDto
   * @param familiesExceptions: CreateWorkflowFanFamilyExceptionDto[],
     @param clientCode: number,
     @param transaction: Transaction
   */
  async getFanByHierarchy<
    Op extends {
      currentRegister?: boolean
      lastRegister?: boolean
      _lowerThenId?: number
      _notId?: number
      _validateDate?: boolean
      _onlyActive?: boolean
    }
  >(
    options: Op,
    lines: CreateWorkflowFanLineDto[],
    linesExceptions: CreateWorkflowFanLineExceptionDto[],
    families: CreateWorkflowFanFamilyDto[],
    familiesExceptions: CreateWorkflowFanFamilyExceptionDto[],
    clientCode: number,
    directorshipCode: number,
    authToken: string,
    transaction?: Transaction
  ): Promise<WorkflowFan> {
    const fans = await this.workflowFan.findAll({
      where: {
        parentCompanyCode: clientCode,
        directorship: directorshipCode,
        ...(options._onlyActive && {
          active: true
        }),
        ...(options._notId && {
          id: {
            $not: options._notId
          }
        }),
        ...(options.currentRegister && {
          currentRegister: true
        }),
        ...(options.lastRegister && {
          lastRegister: true
        }),
        ...(options._validateDate && {
          startDate: {
            $greaterOrEqualThen: moment().utc().startOf('day')
          },
          endDate: {
            $lowerOrEqualThen: moment().utc().endOf('day')
          }
        }),
        ...(options._lowerThenId && {
          id: {
            $lowerThen: options._lowerThenId
          }
        })
      },
      order: [['id', 'DESC']],
      attributes: ['id'],
      include: [
        {
          model: this.workflowFanLine,
          attributes: ['code'],
          required: false
        },
        {
          model: this.workflowFanLineException,
          attributes: ['code'],
          required: false
        },
        {
          model: this.workflowFanFamily,
          attributes: ['code'],
          required: false
        },
        {
          model: this.workflowFanFamilyException,
          attributes: ['code'],
          required: false
        }
      ],
      transaction
    })
    if (!fans[0]) return
    let fanReturn: WorkflowFan
    const linesFromParent = await this.linesService.findAll(
      { lineMasterCode: directorshipCode.toString() },
      authToken
    )
    const familiesFromLines = await this.linesService.findAllFamilies(
      {
        lines: linesFromParent
          .map((lineFromParent) => lineFromParent.lineCode)
          .join()
      },
      authToken
    )
    await Promise.all(
      fans.map(async (fan) => {
        if (fan.lines[0]) {
          if (lines[0]) {
            const lineFilter = lines.filter((line) =>
              fan.lines.find((fanLine) => fanLine.code === line.code)
            )
            if (!lineFilter[0]) return
          } else if (linesExceptions[0]) {
            const lineFilter = linesExceptions.filter(
              (lineException) =>
                !fan.lines.find(
                  (fanLine) => fanLine.code === lineException.code
                )
            )
            if (!lineFilter[0]) return
          }
        } else if (fan.linesExceptions[0]) {
          if (lines[0]) {
            const lineFilter = lines.find(
              (line) =>
                !fan.linesExceptions.find(
                  (fanLineException) => fanLineException.code === line.code
                )
            )
            if (!lineFilter[0]) return
          } else if (linesExceptions[0]) {
            const fanLineNoExceptions = linesFromParent.filter(
              (lineHierarchy) =>
                !fan.linesExceptions.find(
                  (fanLineException) =>
                    fanLineException.code === lineHierarchy.lineCode
                )
            )
            const lineNoException = linesFromParent.filter(
              (lineHierarchy) =>
                !linesExceptions.find(
                  (lineException) =>
                    lineException.code === lineHierarchy.lineCode
                )
            )
            const equal = fanLineNoExceptions.find((fanLineNoException) =>
              lineNoException.find(
                (lineNoException) =>
                  fanLineNoException.lineCode === lineNoException.lineCode
              )
            )
            if (!equal) return
          }
        }
        if (fan.families[0]) {
          if (families[0]) {
            const familyFilter = families.filter((family) =>
              fan.families.find((fanFamily) => fanFamily.code === family.code)
            )
            if (familyFilter[0] && !fanReturn) fanReturn = fan
          } else if (familiesExceptions[0]) {
            const familyExceptionFilter = familiesExceptions.filter(
              (family) =>
                !fan.families.find(
                  (fanFamily) => fanFamily.code === family.code
                )
            )
            if (familyExceptionFilter[0] && !fanReturn) fanReturn = fan
          } else if (!fanReturn) fanReturn = fan
        } else if (fan.familiesExceptions[0]) {
          if (families[0]) {
            const familyFilter = families.filter(
              (family) =>
                !fan.familiesExceptions.find(
                  (fanFamily) => fanFamily.code === family.code
                )
            )
            if (familyFilter[0] && !fanReturn) fanReturn = fan
          } else if (familiesExceptions[0]) {
            const fanFamilyNoExceptions = familiesFromLines.filter(
              (familyFromParentLine) =>
                !fan.familiesExceptions.find(
                  (fanFamilyException) =>
                    fanFamilyException.code === familyFromParentLine.familyCode
                )
            )
            const familyNoExceptions = familiesFromLines.filter(
              (familyFromParentLine) =>
                !familiesExceptions.find(
                  (familyException) =>
                    familyException.code === familyFromParentLine.familyCode
                )
            )
            const equal = fanFamilyNoExceptions.find((fanFamilyException) =>
              familyNoExceptions.find(
                (familyException) =>
                  familyException.familyCode === fanFamilyException.familyCode
              )
            )
            if (equal && !fanReturn) fanReturn = fan
          }
        } else if (!fanReturn) fanReturn = fan
      })
    )
    // eslint-disable-next-line consistent-return
    return fanReturn
  }

  async multipleCreateInFan<M extends { new (): any } & typeof Model>(
    model: M,
    data:
      | CreateWorkflowFanNegotiatedFundDto[]
      | CreateWorkflowFanLineDto[]
      | CreateWorkflowFanLineExceptionDto[]
      | CreateWorkflowFanFamilyDto[]
      | CreateWorkflowFanFamilyExceptionDto[]
      | CreateWorkflowFanPercentageDto[]
      | CreateWorkflowFanGoalAchivementDto[],
    workflowFanId: number,
    transaction: Transaction
  ): Promise<void> {
    const insert = data.map((value) => ({
      ...value,
      workflowFanId
    }))
    await model.bulkCreate(insert, { transaction })
  }

  async multipleDelete<M extends typeof Model & { new (): any }>(
    model: M,
    ids: number[],
    transaction: Transaction
  ): Promise<void> {
    await model.destroy({
      where: {
        id: {
          $in: ids
        }
      },
      transaction
    })
  }

  async multipleUpdate<
    M extends typeof Model & { new (): any },
    Object extends { id: number }
  >(
    model: M,
    /* eslint-disable-next-line @typescript-eslint/ban-types */
    data: Object[],
    transaction: Transaction
  ): Promise<void> {
    await Promise.all(
      data.map(async (value) => {
        await model.update(value, {
          where: {
            id: value.id
          },
          transaction
        })
      })
    )
  }

  /**
   * irá atualizar os registros do FAN
   * @param data UpdateWorkflowFanDto
   * @param workflowFanId number
   * @param userId number
   * @param trx Transaction
   */
  async update(
    data: UpdateWorkflowFanDto,
    workflowFanId: number,
    userId: number,
    authToken: string,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    try {
      const {
        lines,
        linesExceptions,
        families,
        familiesExceptions,
        percentages,
        negotiatedFunds,
        achivements,
        ...updateData
      } = data

      const fan = await this.workflowFan.findByPk(workflowFanId, {
        transaction,
        include: [
          {
            model: this.workflowFanLine,
            attributes: ['id']
          },
          {
            model: this.workflowFanLineException,
            attributes: ['id']
          },
          {
            model: this.workflowFanFamily,
            attributes: ['id']
          },
          {
            model: this.workflowFanFamilyException,
            attributes: ['id']
          },
          {
            model: this.workflowFanGoalAchivement,
            attributes: ['id']
          },
          {
            model: this.workflowFanPercentage,
            attributes: ['id']
          },
          {
            model: this.workflowFanNegotiatedFund,
            attributes: ['id']
          },
          {
            model: WorkflowPerformed,
            attributes: ['id'],
            where: {
              concluded: false
            },
            required: false
          }
        ]
      })
      if (!fan) throw new BadRequestException('FAN não foi encontrado')
      if (fan.performed)
        throw new BadRequestException(
          'O FAN selecionado já possui um fluxo de trabalho em andamento'
        )

      await fan.update({ ...updateData, updatedBy: userId }, { transaction })

      const linesToCreate = lines.filter((line) => !line.id)
      const linesToDeleteIds = fan.lines
        .filter(
          (lineRegister) => !lines.find((line) => line.id === lineRegister.id)
        )
        .map((line) => line.id)
      if (linesToCreate[0])
        await this.multipleCreateInFan(
          this.workflowFanLine,
          linesToCreate,
          workflowFanId,
          transaction
        )
      if (linesToDeleteIds[0])
        await this.multipleDelete(
          this.workflowFanLine,
          linesToDeleteIds,
          transaction
        )
      const linesExceptionsToCreate = linesExceptions.filter(
        (lineException) => !lineException.id
      )
      const linesExceptionsToDeleteIds = fan.linesExceptions
        .filter(
          (lineExceptionRegister) =>
            !linesExceptions.find(
              (lineException) => lineException.id === lineExceptionRegister.id
            )
        )
        .map((lineException) => lineException.id)
      if (linesExceptionsToCreate[0])
        await this.multipleCreateInFan(
          this.workflowFanLineException,
          linesExceptionsToCreate,
          workflowFanId,
          transaction
        )
      if (linesExceptionsToDeleteIds[0])
        await this.multipleDelete(
          this.workflowFanLineException,
          linesExceptionsToDeleteIds,
          transaction
        )
      const familiesToCreate = families.filter((family) => !family.id)
      const familiesToDeleteIds = fan.families
        .filter(
          (familyRegister) =>
            !families.find((family) => family.id === familyRegister.id)
        )
        .map((family) => family.id)
      if (familiesToCreate[0])
        await this.multipleCreateInFan(
          this.workflowFanFamily,
          familiesToCreate,
          workflowFanId,
          transaction
        )
      if (familiesToDeleteIds[0])
        await this.multipleDelete(
          this.workflowFanFamily,
          familiesToDeleteIds,
          transaction
        )
      const familiesExceptionsToCreate = familiesExceptions.filter(
        (familyException) => !familyException.id
      )
      const familiesExceptionsToDeleteIds = fan.familiesExceptions
        .filter(
          (familyExceptionRegister) =>
            !familiesExceptions.find(
              (familyException) =>
                familyException.id === familyExceptionRegister.id
            )
        )
        .map((familyException) => familyException.id)
      if (familiesExceptionsToCreate[0])
        await this.multipleCreateInFan(
          this.workflowFanFamilyException,
          familiesExceptionsToCreate,
          workflowFanId,
          transaction
        )
      if (familiesExceptionsToDeleteIds[0])
        await this.multipleDelete(
          this.workflowFanFamilyException,
          familiesExceptionsToDeleteIds,
          transaction
        )
      const fanRelationsUpdated = await this.findFanLinesFamiliesRelations(
        workflowFanId,
        transaction
      )
      await this.checkFanInProgress(
        fanRelationsUpdated.lines,
        fanRelationsUpdated.linesExceptions,
        fanRelationsUpdated.families,
        fanRelationsUpdated.familiesExceptions,
        fan.parentCompanyCode,
        fan.directorship,
        authToken,
        transaction,
        workflowFanId
      )
      const percentagesToCreate = percentages.filter(
        (percentage) => !percentage.id
      )
      const percentagesToUpdate = percentages.filter(
        (percentage) => percentage.id
      )
      const percentagesToDeleteIds = fan.percentages
        .filter(
          (percentageRegister) =>
            !percentages.find(
              (percentage) => percentage.id === percentageRegister.id
            )
        )
        .map((percentage) => percentage.id)
      if (percentagesToCreate[0])
        await this.multipleCreateInFan(
          this.workflowFanPercentage,
          percentagesToCreate,
          workflowFanId,
          transaction
        )
      if (percentagesToUpdate[0])
        await this.multipleUpdate(
          this.workflowFanPercentage,
          percentagesToUpdate,
          transaction
        )
      if (percentagesToDeleteIds[0])
        await this.multipleDelete(
          this.workflowFanPercentage,
          percentagesToDeleteIds,
          transaction
        )
      const negotiatedFundsToCreate = negotiatedFunds.filter(
        (fundTrated) => !fundTrated.id
      )
      const negotiatedFundsToUpdate = negotiatedFunds.filter(
        (negotiatedFund) => negotiatedFund.id
      )
      const negotiatedFundsToDeleteIds = fan.negotiatedFunds
        .filter(
          (negotiatedFundRegister) =>
            !negotiatedFunds.find(
              (negotiatedFund) =>
                negotiatedFund.id === negotiatedFundRegister.id
            )
        )
        .map((negotiatedFund) => negotiatedFund.id)
      if (negotiatedFundsToCreate[0])
        await this.multipleCreateInFan(
          this.workflowFanNegotiatedFund,
          negotiatedFundsToCreate,
          workflowFanId,
          transaction
        )
      if (negotiatedFundsToUpdate[0])
        await this.multipleUpdate(
          this.workflowFanNegotiatedFund,
          negotiatedFundsToUpdate,
          transaction
        )
      if (negotiatedFundsToDeleteIds[0])
        await this.multipleDelete(
          this.workflowFanNegotiatedFund,
          negotiatedFundsToDeleteIds,
          transaction
        )
      const achivementsToCreate = achivements.filter(
        (achivement) => !achivement.id
      )
      const achivementsToUpdate = achivements.filter(
        (achivement) => achivement.id
      )
      const achivementsToDeleteIds = fan.achivements
        .filter(
          (achivementRegister) =>
            !achivements.find(
              (achivement) => achivement.id === achivementRegister.id
            )
        )
        .map((achivement) => achivement.id)
      if (achivementsToCreate[0])
        await this.multipleCreateInFan(
          this.workflowFanGoalAchivement,
          achivementsToCreate,
          workflowFanId,
          transaction
        )
      if (achivementsToUpdate[0])
        await this.multipleUpdate(
          this.workflowFanGoalAchivement,
          achivementsToUpdate,
          transaction
        )
      if (achivementsToDeleteIds[0])
        await this.multipleDelete(
          this.workflowFanGoalAchivement,
          achivementsToDeleteIds,
          transaction
        )
      if (!trx) await transaction.commit()
      return fan.id
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o FAN'
      )
    }
  }

  /**
   * Irá trazer as famílias, linhas e exceções atualizadas
   * após atualização
   * @param workflowFanId number
   * @param transaction: Transaction,
   */
  async findFanLinesFamiliesRelations(
    workflowFanId: number,
    transaction: Transaction
  ): Promise<WorkflowFan> {
    return this.workflowFan.findByPk(workflowFanId, {
      attributes: ['id'],
      include: [
        {
          model: this.workflowFanLine,
          attributes: ['code']
        },
        {
          model: this.workflowFanFamily,
          attributes: ['code']
        },
        {
          model: this.workflowFanFamilyException,
          attributes: ['code']
        },
        {
          model: this.workflowFanLineException,
          attributes: ['code']
        }
      ],
      transaction
    })
  }

  /**
   * irá criar os documentos para o FAN
   * validando o índice
   * @param workflowFanId number
   * @param data CreateWorkflowFanDocumentDto
   */
  async createDocuments(
    workflowFanId: number,
    data: CreateWorkflowFanDocumentDto,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    try {
      const { documents } = data
      const fan = await this.workflowFan.findByPk(workflowFanId, {
        attributes: ['id'],
        transaction
      })
      if (!fan) throw new BadRequestException('FAN não encontrado')
      const insert: {
        version: number
        description: string
        fileId: number
      }[] = []
      await Promise.all(
        documents.map(async (document) => {
          const documentInsert = {
            ...document,
            version: 1,
            workflowFanId
          }
          const sameName = await this.workflowFanDocument.findOne({
            attributes: ['version'],
            order: [['version', 'DESC']],
            include: [
              {
                model: this.file,
                where: {
                  id: {
                    $not: document.fileId
                  },
                  filename: document.filename
                },
                attributes: ['filename']
              },
              {
                model: this.workflowFan,
                where: {
                  id: workflowFanId
                },
                attributes: ['id']
              }
            ]
          })
          if (sameName) {
            documentInsert.version = sameName.version + 1
          }
          insert.push(documentInsert)
        })
      )
      await this.workflowFanDocument.bulkCreate(insert, {
        transaction
      })
      if (!trx) await transaction.commit()
      return workflowFanId
    } catch (error) {
      if (!trx) await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao criar os documentos do FAN'
      )
    }
  }

  /**
   * Irá deletar o documento do FAN
   * @param workflowFanId
     @param documentId
     @param userId
   */
  async deleteDocument(
    documentId: number,
    userId: number,
    trx?: Transaction
  ): Promise<void> {
    const transaction = trx || (await this.db.transaction())

    try {
      const document = await this.workflowFanDocument.findByPk(documentId, {
        attributes: ['id', 'fileId', 'version'],
        transaction
      })
      await document.destroy({ transaction })
      await this.filesService.delete(document.fileId, userId, transaction)
      if (!trx) await transaction.commit()
    } catch (error) {
      if (!trx) await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao remover o documento do FAN'
      )
    }
  }

  /**
   * irá validar os campos obrigatórios
   * e iniciar o workflow
   * @param workflowFanId number
   * @param userId number
   * @param trx Transaction
   */
  async startWorkflow(
    workflowFanId: number,
    userId: number,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())
    try {
      const workflowFan = await this.workflowFan.findByPk(workflowFanId, {
        attributes: ['id', 'parentCompanyCode', 'workflowPerformedId']
      })
      if (!workflowFan) throw new BadRequestException('Fan não foi encontrado')
      const workflowInProgress = await this.findWorkFlowInProgress(
        workflowFan.parentCompanyCode
      )
      if (workflowInProgress)
        throw new BadRequestException(
          'O FAN selecionado já possui um fluxo de trabalho em andamento'
        )
      await this.validateRequiredFields(workflowFanId)
      const workflowPerformedId =
        await this.workflowPerformedService.startWorkflow(
          WorkflowTypeEnum.ANV,
          userId,
          transaction
        )
      workflowFan.workflowPerformedId = workflowPerformedId
      await workflowFan.save({ transaction })
      await this.workflowFanPerformed.create(
        {
          workflowPerformedId,
          workflowFanId
        },
        { transaction }
      )
      if (!trx) await transaction.commit()
      return workflowFan.workflowPerformedId
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao iniciar o fluxo de trabalho do FAN'
      )
    }
  }

  async validateRequiredFields(workflowFanId: number): Promise<boolean> {
    const fan = await this.workflowFan.findByPk(workflowFanId, {
      include: [
        {
          model: this.workflowFanPercentage
        },
        {
          model: this.workflowFanNegotiatedFund
        },
        {
          model: this.workflowFanGoalAchivement
        }
      ]
    })
    if (!fan)
      throw new BadRequestException(
        'Todos as seções cadastrais são obrigatórias'
      )
    const notIn = []
    WorkflowFanSet.forEach((value: keyof WorkflowFan) => {
      if (!fan.getDataValue(value)) notIn.push(value)
    })
    if (notIn[0])
      throw new BadRequestException(
        `Os campos [${ notIn.join() }] são obrigatórios`
      )
    return true
  }

  async findWorkFlowInProgress(
    parentCompanyCode: number
  ): Promise<WorkflowFan> {
    return this.workflowFan.findOne({
      where: {
        parentCompanyCode
      },
      attributes: ['id'],
      include: [
        {
          model: WorkflowPerformed,
          attributes: ['id'],
          where: {
            concluded: false
          }
        }
      ]
    })
  }
}
