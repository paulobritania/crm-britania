import { BadRequestException, InternalServerErrorException, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { MockEntity } from '../../utils/mocks/Entity'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { Access } from '../accesses/entities/access.entity'
import { Field } from '../fields/entities/field.entity'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { Profile } from '../profiles/entities/profile.entity'
import { User } from '../users/entities/user.entity'
import { CreateWorkflowDto } from './dtos/create/createWorkflow.dto'
import { WorkflowsQueryDto } from './dtos/findAll/workflowQuery.dto'
import { UpdateWorkflowDto } from './dtos/update/updateWorkflow.dto'
import { UpdateWorkflowTaskDto } from './dtos/update/updateWorkflowTask.dto'
import { UpdateWorkflowTaskConditionDto } from './dtos/update/updateWorkflowTaskCondition.dto'
import { UpdateWorkflowTaskResponseDto } from './dtos/update/updateWorkflowTaskResponse.dto'
import { Workflow } from './entities/workflow.entity'
import { WorkflowHistory } from './entities/workflowHistory.entity'
import { WorkflowTask } from './entities/workflowTask.entity'
import { WorkflowTaskCondition } from './entities/workflowTaskCondition.entity'
import { WorkflowTaskResponse } from './entities/workflowTaskResponse.entity'
import { WorkflowType } from './entities/workflowType.entity'
import { WorkflowTypeAccess } from './entities/workflowTypesAccess.entity'
import { WorkflowOrderByOptions } from './enum/workflowOrderByOptions.enum'
import { WorkflowStatusEnum } from './enum/workflowStatus.enum'
import { WorkflowTypeEnum } from './enum/workflowType.enum'
import { WorkflowsService } from './workflows.service'

describe('WorkflowsService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: WorkflowsService
  let profileData: Profile
  let fieldData: Field
  let accessData: Access
  let typeData: WorkflowType
  let typeAccessData: WorkflowTypeAccess
  let conditionData: WorkflowTaskCondition
  let responseData: WorkflowTaskResponse
  let taskData: WorkflowTask
  let userData: User
  let workflowData: Workflow
  let historyData: WorkflowHistory
  let responseDto: UpdateWorkflowTaskResponseDto
  let conditionDto: UpdateWorkflowTaskConditionDto
  let taskDto: UpdateWorkflowTaskDto
  let updateDto: UpdateWorkflowDto
  let createDto: CreateWorkflowDto

  const id = 1
  const userId = 1

  beforeAll(() => {
    profileData = MockEntity({
      id,
      name: 'test',
      active: true,
      permissions: null,
      accesses: null,
      micros: null,
      exceptions: null,
      userProfiles: null,
      workflowTasks: null
    })

    accessData = MockEntity({
      id,
      name: 'test',
      alias: 'test',
      access: null,
      fields: null
    })

    fieldData = MockEntity({
      id,
      name: 'test',
      alias: 'test',
      accessId: 1,
      access: accessData
    })

    typeData = MockEntity({
      id,
      code: 'VPC',
      description: 'VPC'
    })

    typeAccessData = MockEntity({
      id,
      accessId: accessData.id,
      workflowTypeId: typeData.id,
      access: accessData,
      workflowType: typeData
    })

    conditionData = MockEntity({
      id: 1,
      workflowTaskId: 1,
      title: 'test',
      order: 1,
      fieldId: 1,
      comparisonSymbol: 'test',
      comparisonValue: 'test',
      field: fieldData
    })

    responseData = MockEntity({
      id: 1,
      workflowTaskId: 1,
      title: 'test',
      order: 1,
      requiresJustification: false,
      nextTaskOrder: 1,
      finishWorkflowSuccessfully: false,
      finishWorkflowWithError: false,
      task: null
    })

    userData = MockEntity({
      id,
      createdBy: 1,
      customerHierarchyEnabled: false,
      email: 'test@test.com',
      username: 'test',
      file: null,
      imageId: 1,
      isActive: true,
      phone: null,
      representativeCodes: [],
      substituteUserId: null,
      substituteUserStartDate: null,
      substituteUserEndDate: null,
      updatedBy: 1,
      userProfile: null,
      userProfiles: null,
      substituteUser: null
    })

    taskData = MockEntity({
      id: 1,
      workflowId: id,
      title: 'test',
      order: 1,
      profileId: 1,
      profile: profileData,
      userId: 1,
      user: userData,
      userAlternateId: 1,
      userAlternate: userData,
      deadline: 10,
      workflow: null,
      conditions: [conditionData],
      responses: [responseData],
      allowApproverFromHierarchy: false
    })

    workflowData = MockEntity({
      id,
      title: 'Fluxo teste - PCC - Editado',
      description: 'Fluxo de teste de PCC - Editado',
      dateStart: new Date().toISOString(),
      dateEnd: new Date().toISOString(),
      active: true,
      createdBy: 1,
      createdByUser: userData,
      updatedByUser: null,
      version: 1,
      subversion: 0,
      tasks: [taskData],
      typeId: 1,
      workflowType: typeData,
      workflowHistory: null
    })

    historyData = MockEntity({
      updatedFields: 'Título',
      workflowId: id,
      workflow: workflowData
    })

    responseDto = {
      title: 'test',
      order: 1,
      requiresJustification: false,
      nextTaskOrder: 1,
      finishWorkflowSuccessfully: false,
      finishWorkflowWithError: false
    }

    conditionDto = {
      title: 'test',
      comparisonSymbol: 'test',
      comparisonValue: 'test',
      fieldId: 1,
      order: 1
    }

    taskDto = {
      title: 'test',
      order: 1,
      profileId: 1,
      userId: 1,
      userAlternateId: 1,
      deadline: 10,
      conditions: [conditionDto],
      responses: [responseDto],
      allowApproverFromHierarchy: false
    }

    updateDto = {
      title: 'Fluxo teste - PCC - Editado',
      description: 'Fluxo de teste de PCC - Editado',
      dateStart: new Date().toISOString(),
      dateEnd: new Date().toISOString(),
      tasks: [taskDto]
    }

    createDto = {
      ...updateDto,
      typeId: 1
    }

    LogsServiceProvider = { ...LogsService }
  })

  beforeEach(async () => {
    mockModel = MockModel()
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        DatabaseProviderMock,
        WorkflowsService,
        {
          provide: getModelToken(Workflow),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTask),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTaskCondition),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTaskResponse),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTypeAccess),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowType),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowHistory),
          useValue: mockModel
        },
        {
          provide: getModelToken(Hierarchy),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<WorkflowsService>(WorkflowsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('update', () => {
    it('should fail and rollback when a method throw an error', async () => {
      jest.spyOn(service, 'deactivate').mockRejectedValueOnce(new Error())

      let error = null
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.update(id, updateDto, userId)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(InternalServerErrorException)
      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should fail and rollback when workflow is already inactive', async () => {
      jest
        .spyOn(service, 'deactivate')
        .mockRejectedValueOnce(
          new BadRequestException('The Workflow is already inactive')
        )

      let error = null
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.update(id, updateDto, userId)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual('The Workflow is already inactive')
      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should deactivate the edited workflow, create a new one, save history, commit and return the new id', async () => {
      const expectedResponse = 2

      const deactivateSpy = jest
        .spyOn(service, 'deactivate')
        .mockImplementationOnce(() => Promise.resolve())

      const findByIdWithIncludesSpy = jest
        .spyOn(service, 'findByIdWithIncludes')
        .mockResolvedValueOnce(workflowData)

      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(expectedResponse)

      const compareAndSaveHistorySpy = jest
        .spyOn(service, 'compareAndSaveHistory')
        .mockImplementationOnce(() => Promise.resolve())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      const newWorkflow = {
        ...updateDto,
        typeId: workflowData.typeId
      }

      const result = await service.update(id, updateDto, userId)

      expect(deactivateSpy).toHaveBeenCalledTimes(1)
      expect(deactivateSpy).toHaveBeenCalledWith(id, userId, transaction)

      expect(findByIdWithIncludesSpy).toHaveBeenCalledTimes(1)
      expect(findByIdWithIncludesSpy).toHaveBeenCalledWith(id, transaction)

      expect(createSpy).toHaveBeenCalledTimes(1)
      expect(createSpy).toHaveBeenCalledWith(
        newWorkflow,
        userId,
        workflowData.version,
        transaction
      )

      expect(compareAndSaveHistorySpy).toHaveBeenCalledTimes(1)
      expect(compareAndSaveHistorySpy).toHaveBeenCalledWith(
        workflowData.toJSON(),
        newWorkflow,
        expectedResponse,
        transaction
      )

      expect(result).not.toBeNull()
      expect(result).toEqual(expectedResponse)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })
  })

  describe('compareAndSaveHistory', () => {
    it('should get workflow updated fields and save history', async () => {
      const getUpdatedFieldsSpy = jest
        .spyOn(service, 'getUpdatedFields')
        .mockReturnValueOnce(['Título'])

      const saveHistory = jest
        .spyOn(service, 'saveHistory')
        .mockImplementationOnce(() => Promise.resolve())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      await service.compareAndSaveHistory(
        workflowData,
        createDto,
        id,
        transaction as any
      )

      expect(getUpdatedFieldsSpy).toHaveBeenCalledTimes(1)
      expect(getUpdatedFieldsSpy).toHaveBeenCalledWith(workflowData, createDto)

      expect(saveHistory).toHaveBeenCalledTimes(1)
    })
  })

  describe('getUpdatedFields', () => {
    it('should return title, description, shelf life, one more task and one task changed', () => {
      const getTaskUpdatedFieldsMessage = 'Tarefa x alterada'
      const expectedResponse = [
        'Título',
        'Descrição',
        'Validade',
        '1 nova(s) tarefa(s) adicionada(s)',
        getTaskUpdatedFieldsMessage
      ]

      const updatedWorkflow = {
        ...createDto,
        title: 'Test!',
        description: 'Test!',
        dateStart: new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        ).toISOString(),
        tasks: [
          { ...createDto.tasks[0], title: 'Test!' },
          { ...createDto.tasks[0], title: 'Test 2!', order: 2 }
        ]
      }

      const getTaskUpdatedFieldsSpy = jest
        .spyOn(service, 'getTaskUpdatedFields')
        .mockReturnValue([getTaskUpdatedFieldsMessage])

      const response = service.getUpdatedFields(workflowData, updatedWorkflow)

      expect(response).toEqual(expectedResponse)

      expect(getTaskUpdatedFieldsSpy).toHaveBeenCalledTimes(1)
      expect(getTaskUpdatedFieldsSpy).toHaveBeenCalledWith(
        workflowData.tasks,
        updatedWorkflow.tasks
      )
    })

    it('should return one less task and three task changed', () => {
      const getTaskUpdatedFieldsMessages = [
        'Tarefa x alterada',
        'Tarefa y alterada',
        'Tarefa z alterada'
      ]
      const expectedResponse = [
        '1 tarefa(s) removida(s)',
        getTaskUpdatedFieldsMessages[0],
        getTaskUpdatedFieldsMessages[1],
        'Mais 1 tarefa(s) atualizada(s)'
      ]

      const workflow = {
        ...workflowData,
        tasks: [
          workflowData.tasks[0],
          { ...workflowData.tasks[0], title: 'task 2', order: 2 },
          { ...workflowData.tasks[0], title: 'task 3', order: 3 },
          { ...workflowData.tasks[0], title: 'task 4', order: 4 }
        ]
      } as Workflow

      const updatedWorkflow = {
        ...createDto,
        tasks: [
          { ...createDto.tasks[0], title: 'task 1!' },
          { ...createDto.tasks[0], title: 'task 2!', order: 2 },
          { ...createDto.tasks[0], title: 'task 3!', order: 3 }
        ]
      }

      const getTaskUpdatedFieldsSpy = jest
        .spyOn(service, 'getTaskUpdatedFields')
        .mockReturnValue(getTaskUpdatedFieldsMessages)

      const response = service.getUpdatedFields(workflow, updatedWorkflow)

      expect(response).toEqual(expectedResponse)

      expect(getTaskUpdatedFieldsSpy).toHaveBeenCalledTimes(1)
      expect(getTaskUpdatedFieldsSpy).toHaveBeenCalledWith(
        workflow.tasks,
        updatedWorkflow.tasks
      )
    })

    it('should return shelf life changed', () => {
      const expectedResponse = ['Validade']

      const updatedWorkflow = {
        ...createDto,
        dateEnd: new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        ).toISOString()
      }

      const getTaskUpdatedFieldsSpy = jest
        .spyOn(service, 'getTaskUpdatedFields')
        .mockReturnValue([])

      const response = service.getUpdatedFields(workflowData, updatedWorkflow)

      expect(response).toEqual(expectedResponse)

      expect(getTaskUpdatedFieldsSpy).toHaveBeenCalledTimes(1)
      expect(getTaskUpdatedFieldsSpy).toHaveBeenCalledWith(
        workflowData.tasks,
        updatedWorkflow.tasks
      )
    })
  })

  describe('getTaskUpdatedFields', () => {
    it('should return task changed when number of conditions is not equal', () => {
      const oldTasks = [taskData]
      const newTasks = [
        {
          ...taskDto,
          conditions: [
            taskDto.conditions[0],
            { ...taskDto.conditions[0], order: 2 }
          ]
        }
      ]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(0)
      expect(responsesSpy).toHaveBeenCalledTimes(0)
    })

    it('should return task changed when number of responses is not equal', () => {
      const oldTasks = [taskData]
      const newTasks = [
        {
          ...taskDto,
          responses: [
            taskDto.responses[0],
            { ...taskDto.responses[0], order: 2 }
          ]
        }
      ]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(0)
      expect(responsesSpy).toHaveBeenCalledTimes(0)
    })

    it('should return task changed when title is not equal', () => {
      const oldTasks = [taskData]
      const newTasks = [{ ...taskDto, title: 'test!' }]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(0)
      expect(responsesSpy).toHaveBeenCalledTimes(0)
    })

    it('should return task changed when deadline is not equal', () => {
      const oldTasks = [taskData]
      const newTasks = [{ ...taskDto, deadline: 100 }]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(0)
      expect(responsesSpy).toHaveBeenCalledTimes(0)
    })

    it('should return task changed when profileId is not equal', () => {
      const oldTasks = [taskData]
      const newTasks = [{ ...taskDto, profileId: 2 }]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(0)
      expect(responsesSpy).toHaveBeenCalledTimes(0)
    })

    it('should return task changed when userId is not equal', () => {
      const oldTasks = [taskData]
      const newTasks = [{ ...taskDto, userId: 2 }]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(0)
      expect(responsesSpy).toHaveBeenCalledTimes(0)
    })

    it('should return task changed when userAlternateId is not equal', () => {
      const oldTasks = [taskData]
      const newTasks = [{ ...taskDto, userAlternateId: 2 }]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(0)
      expect(responsesSpy).toHaveBeenCalledTimes(0)
    })

    it('should return task changed when conditions are not equals', () => {
      const oldTasks = [taskData]
      const newTasks = [taskDto]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(true)

      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(1)
      expect(conditionsSpy).toHaveBeenCalledWith(
        taskData.conditions,
        taskDto.conditions
      )
      expect(responsesSpy).toHaveBeenCalledTimes(0)
    })

    it('should return task changed when responses are not equals', () => {
      const oldTasks = [taskData]
      const newTasks = [taskDto]

      const expectedResponse = [`Tarefa '${ oldTasks[0].title }' alterada`]

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(true)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(1)
      expect(conditionsSpy).toHaveBeenCalledWith(
        taskData.conditions,
        taskDto.conditions
      )
      expect(responsesSpy).toHaveBeenCalledTimes(1)
      expect(responsesSpy).toHaveBeenCalledWith(
        taskData.responses,
        taskDto.responses
      )
    })

    it('should return an empty array when the tasks are equals', () => {
      const oldTasks = [taskData, { ...taskData, order: 2 } as WorkflowTask]
      const newTasks = [taskDto]

      const expectedResponse = []

      const conditionsSpy = jest
        .spyOn(service, 'checkIfConditionsHasUpdatedFields')
        .mockReturnValue(false)
      const responsesSpy = jest
        .spyOn(service, 'checkIfResponsesHasUpdatedFields')
        .mockReturnValue(false)

      const response = service.getTaskUpdatedFields(oldTasks, newTasks)

      expect(response).toEqual(expectedResponse)

      expect(conditionsSpy).toHaveBeenCalledTimes(1)
      expect(conditionsSpy).toHaveBeenCalledWith(
        taskData.conditions,
        taskDto.conditions
      )
      expect(responsesSpy).toHaveBeenCalledTimes(1)
      expect(responsesSpy).toHaveBeenCalledWith(
        taskData.responses,
        taskDto.responses
      )
    })
  })

  describe('checkIfConditionsHasUpdatedFields', () => {
    it('should return true when there is one less condition', () => {
      const oldConditions = [
        conditionData,
        { ...conditionData, order: 2 } as WorkflowTaskCondition
      ]
      const conditions = [conditionDto]

      const response = service.checkIfConditionsHasUpdatedFields(
        oldConditions,
        conditions
      )

      expect(response).toBeTruthy()
    })

    it('should return true when the title is no equal', () => {
      const oldConditions = [conditionData]
      const conditions = [{ ...conditionDto, title: 'test!' }]

      const response = service.checkIfConditionsHasUpdatedFields(
        oldConditions,
        conditions
      )

      expect(response).toBeTruthy()
    })

    it('should return true when the comparison symbol is no equal', () => {
      const oldConditions = [conditionData]
      const conditions = [{ ...conditionDto, comparisonSymbol: '!=' }]

      const response = service.checkIfConditionsHasUpdatedFields(
        oldConditions,
        conditions
      )

      expect(response).toBeTruthy()
    })

    it('should return true when the comparison value is no equal', () => {
      const oldConditions = [conditionData]
      const conditions = [{ ...conditionDto, comparisonValue: 'Z' }]

      const response = service.checkIfConditionsHasUpdatedFields(
        oldConditions,
        conditions
      )

      expect(response).toBeTruthy()
    })

    it('should return true when the fieldId is no equal', () => {
      const oldConditions = [conditionData]
      const conditions = [
        { ...conditionDto, fieldId: conditionData.fieldId + 1 }
      ]

      const response = service.checkIfConditionsHasUpdatedFields(
        oldConditions,
        conditions
      )

      expect(response).toBeTruthy()
    })

    it('should return false when the conditions are equals', () => {
      const oldConditions = [conditionData]
      const conditions = [conditionDto]

      const response = service.checkIfConditionsHasUpdatedFields(
        oldConditions,
        conditions
      )

      expect(response).toBeFalsy()
    })
  })

  describe('checkIfResponsesHasUpdatedFields', () => {
    it('should return false when there is one less response', () => {
      const oldResponses = [
        responseData,
        { ...responseData, order: 2 } as WorkflowTaskResponse
      ]
      const responses = [responseDto]

      const response = service.checkIfResponsesHasUpdatedFields(
        oldResponses,
        responses
      )

      expect(response).toBeTruthy()
    })

    it('should return true when the title is no equal', () => {
      const oldResponses = [responseData]
      const responses = [{ ...responseDto, title: 'test!' }]

      const response = service.checkIfResponsesHasUpdatedFields(
        oldResponses,
        responses
      )

      expect(response).toBeTruthy()
    })

    it('should return true when the requires justification is no equal', () => {
      const oldResponses = [responseData]
      const responses = [
        {
          ...responseDto,
          requiresJustification: !responseData.requiresJustification
        }
      ]

      const response = service.checkIfResponsesHasUpdatedFields(
        oldResponses,
        responses
      )

      expect(response).toBeTruthy()
    })

    it('should return true when the next task order is no equal', () => {
      const oldResponses = [responseData]
      const responses = [{ ...responseDto, nextTaskOrder: 2 }]

      const response = service.checkIfResponsesHasUpdatedFields(
        oldResponses,
        responses
      )

      expect(response).toBeTruthy()
    })

    it('should return false when the responses are equals', () => {
      const oldResponses = [responseData]
      const responses = [responseDto]

      const response = service.checkIfResponsesHasUpdatedFields(
        oldResponses,
        responses
      )

      expect(response).toBeFalsy()
    })
  })

  describe('deactivate', () => {
    it('should throw a bad request when the workflow does not exist', async () => {
      let error = null

      const findByPkSpy = mockModel.findByPk.mockResolvedValue(undefined)
      const updateSpy = mockModel.update.mockResolvedValue(undefined)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.deactivate(id, userId)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual('Fluxo de trabalho não encontrado')

      expect(findByPkSpy).toHaveBeenCalledTimes(1)

      expect(updateSpy).toHaveBeenCalledTimes(0)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should throw a bad request when the workflow is already inactive', async () => {
      let error = null

      const findByPkSpy = mockModel.findByPk.mockResolvedValue({
        ...workflowData,
        active: false
      })
      const updateSpy = mockModel.update.mockResolvedValue(undefined)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.deactivate(id, userId)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual('Este fluxo de trabalho já está inativo')

      expect(findByPkSpy).toHaveBeenCalledTimes(1)

      expect(updateSpy).toHaveBeenCalledTimes(0)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should throw a bad request when the update fails and rollback', async () => {
      let error = null

      const findByPkSpy = mockModel.findByPk.mockResolvedValue(workflowData)
      const updateSpy = mockModel.update.mockRejectedValue(new Error())
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.deactivate(id, userId)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(InternalServerErrorException)

      expect(findByPkSpy).toHaveBeenCalledTimes(1)

      expect(updateSpy).toHaveBeenCalledTimes(1)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should throw a bad request when the update fails with an external transaction', async () => {
      let error = null

      const findByPkSpy = mockModel.findByPk.mockResolvedValue(workflowData)
      const updateSpy = mockModel.update.mockRejectedValue(new Error())
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.deactivate(id, userId, transaction as any)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(InternalServerErrorException)

      expect(findByPkSpy).toHaveBeenCalledTimes(1)

      expect(updateSpy).toHaveBeenCalledTimes(1)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should deactivate the workflow and commit', async () => {
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(workflowData)
      const updateSpy = mockModel.update.mockImplementation(() =>
        Promise.resolve()
      )
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      await service.deactivate(id, userId)

      expect(findByPkSpy).toHaveBeenCalledTimes(1)

      expect(updateSpy).toHaveBeenCalledTimes(1)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should deactivate the workflow with an external transaction', async () => {
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(workflowData)
      const updateSpy = mockModel.update.mockImplementation(() =>
        Promise.resolve()
      )
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      await service.deactivate(id, userId, transaction as any)

      expect(findByPkSpy).toHaveBeenCalledTimes(1)

      expect(updateSpy).toHaveBeenCalledTimes(1)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })
  })

  describe('findById', () => {
    it('should return undefined when user does not exist', async () => {
      const findByIdWithIncludesSpy = jest
        .spyOn(service, 'findByIdWithIncludes')
        .mockResolvedValue(undefined)

      const getWorkflowHistories = jest
        .spyOn(service, 'getWorkflowHistories')
        .mockResolvedValue([historyData])

      const formatWorkflowVersionSpy = jest
        .spyOn(service, 'formatWorkflowVersion')
        .mockReturnValue('VPC.1.0')

      const response = await service.findById(id)

      expect(response).toEqual(undefined)

      expect(findByIdWithIncludesSpy).toHaveBeenCalledTimes(1)
      expect(findByIdWithIncludesSpy).toHaveBeenCalledWith(id)

      expect(getWorkflowHistories).toHaveBeenCalledTimes(0)

      expect(formatWorkflowVersionSpy).toHaveBeenCalledTimes(0)
    })

    it('should return the workflow with all includes and histories', async () => {
      const findByIdWithIncludesSpy = jest
        .spyOn(service, 'findByIdWithIncludes')
        .mockResolvedValue(workflowData)

      const getWorkflowHistories = jest
        .spyOn(service, 'getWorkflowHistories')
        .mockResolvedValue([historyData])

      const formatWorkflowVersionSpy = jest
        .spyOn(service, 'formatWorkflowVersion')
        .mockReturnValue('VPC.1.0')

      const response = await service.findById(id)

      expect(response).not.toBeNull()
      expect(response.tasks.length).not.toEqual(0)
      expect(response.histories.length).not.toEqual(0)

      expect(findByIdWithIncludesSpy).toHaveBeenCalledTimes(1)
      expect(findByIdWithIncludesSpy).toHaveBeenCalledWith(id)

      expect(getWorkflowHistories).toHaveBeenCalledTimes(1)

      expect(formatWorkflowVersionSpy).toHaveBeenCalledTimes(2)
    })

    it('should return the workflow with all includes, histories and with an user that updated the task', async () => {
      const workflow = {
        ...workflowData,
        updatedAt: new Date(),
        updatedByUser: userData
      }
      const findByIdWithIncludesSpy = jest
        .spyOn(service, 'findByIdWithIncludes')
        .mockResolvedValue({
          ...workflow,
          toJSON: () => workflow
        } as Workflow)

      const getWorkflowHistories = jest
        .spyOn(service, 'getWorkflowHistories')
        .mockResolvedValue([historyData])

      const formatWorkflowVersionSpy = jest
        .spyOn(service, 'formatWorkflowVersion')
        .mockReturnValue('VPC.1.0')

      const response = await service.findById(id)

      expect(response).not.toBeNull()
      expect(response.tasks.length).not.toEqual(0)
      expect(response.histories.length).not.toEqual(0)

      expect(findByIdWithIncludesSpy).toHaveBeenCalledTimes(1)
      expect(findByIdWithIncludesSpy).toHaveBeenCalledWith(id)

      expect(getWorkflowHistories).toHaveBeenCalledTimes(1)

      expect(formatWorkflowVersionSpy).toHaveBeenCalledTimes(2)
    })

    it('should return the workflow with all includes, histories and without an user', async () => {
      const workflow = {
        ...workflowData,
        createdByUser: null,
        tasks: [
          ...workflowData.tasks.map((task) => ({
            ...task,
            user: null,
            userAlternate: null
          }))
        ]
      }
      const findByIdWithIncludesSpy = jest
        .spyOn(service, 'findByIdWithIncludes')
        .mockResolvedValue({
          ...workflow,
          toJSON: () => workflow
        } as Workflow)

      const getWorkflowHistories = jest
        .spyOn(service, 'getWorkflowHistories')
        .mockResolvedValue([historyData])

      const formatWorkflowVersionSpy = jest
        .spyOn(service, 'formatWorkflowVersion')
        .mockReturnValue('VPC.1.0')

      const response = await service.findById(id)

      expect(response).not.toBeNull()
      expect(response.tasks.length).not.toEqual(0)
      expect(response.histories.length).not.toEqual(0)

      expect(findByIdWithIncludesSpy).toHaveBeenCalledTimes(1)
      expect(findByIdWithIncludesSpy).toHaveBeenCalledWith(id)

      expect(getWorkflowHistories).toHaveBeenCalledTimes(1)

      expect(formatWorkflowVersionSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('findAll', () => {
    it('should return all workflows with filters', async () => {
      const query: WorkflowsQueryDto = {
        title: 'teste',
        typeId: '1',
        status: WorkflowStatusEnum.ACTIVE,
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        limit: '1',
        offset: '1',
        orderBy: WorkflowOrderByOptions.STATUS
      }
      const version = 'VPC.1.0'

      const findAllSpy = mockModel.findAll.mockResolvedValue([workflowData])

      const formatWorkflowVersionSpy = jest
        .spyOn(service, 'formatWorkflowVersion')
        .mockReturnValue(version)

      const response = await service.findAll(query)

      expect(response.length).not.toEqual(0)
      expect(response[0].type).toEqual(typeData.description)
      expect(response[0].version).toEqual(version)

      expect(formatWorkflowVersionSpy).toHaveBeenCalledTimes(1)

      expect(findAllSpy).toHaveBeenCalledTimes(1)
    })

    it('should return all workflows order by type', async () => {
      const query: WorkflowsQueryDto = {
        orderBy: WorkflowOrderByOptions.TYPE
      }
      const version = 'VPC.1.0'

      const findAllSpy = mockModel.findAll.mockResolvedValue([workflowData])

      const formatWorkflowVersionSpy = jest
        .spyOn(service, 'formatWorkflowVersion')
        .mockReturnValue(version)

      const response = await service.findAll(query)

      expect(response.length).not.toEqual(0)
      expect(response[0].type).toEqual(typeData.description)
      expect(response[0].version).toEqual(version)

      expect(formatWorkflowVersionSpy).toHaveBeenCalledTimes(1)

      expect(findAllSpy).toHaveBeenCalledTimes(1)
    })

    it('should return all workflows without filters', async () => {
      const query: WorkflowsQueryDto = {}
      const version = 'VPC.1.0'

      const findAllSpy = mockModel.findAll.mockResolvedValue([workflowData])

      const formatWorkflowVersionSpy = jest
        .spyOn(service, 'formatWorkflowVersion')
        .mockReturnValue(version)

      const response = await service.findAll(query)

      expect(response.length).not.toEqual(0)
      expect(response[0].type).toEqual(typeData.description)
      expect(response[0].version).toEqual(version)

      expect(formatWorkflowVersionSpy).toHaveBeenCalledTimes(1)

      expect(findAllSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    it('should throw an error when workflow type does not exist and rollback', async () => {
      let error = null

      const findWorkflowTypeByIdSpy = jest
        .spyOn(service, 'findWorkflowTypeById')
        .mockResolvedValue(undefined)

      const generateWorkflowVersionSpy = jest
        .spyOn(service, 'generateWorkflowVersion')
        .mockResolvedValue(1)

      const generateWorkflowSubversion = jest
        .spyOn(service, 'generateWorkflowSubversion')
        .mockResolvedValue(0)

      const validateWorkflowPeriodSpy = jest
        .spyOn(service, 'validateWorkflowPeriod')
        .mockImplementation(() => Promise.resolve())

      const mockCreate = mockModel.create.mockResolvedValue(1)

      const createTasksSpy = jest
        .spyOn(service, 'createTasks')
        .mockImplementation(() => Promise.resolve())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.create(createDto, userId)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual('O tipo do fluxo de trabalho informado é inválido')

      expect(findWorkflowTypeByIdSpy).toHaveBeenCalledTimes(1)
      expect(generateWorkflowVersionSpy).toHaveBeenCalledTimes(0)
      expect(generateWorkflowSubversion).toHaveBeenCalledTimes(0)
      expect(validateWorkflowPeriodSpy).toHaveBeenCalledTimes(0)
      expect(mockCreate).toHaveBeenCalledTimes(0)
      expect(createTasksSpy).toHaveBeenCalledTimes(0)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should throw an error when can not save and not rollback because of external transaction', async () => {
      let error = null

      const findWorkflowTypeByIdSpy = jest
        .spyOn(service, 'findWorkflowTypeById')
        .mockResolvedValue(typeData)

      const generateWorkflowVersionSpy = jest
        .spyOn(service, 'generateWorkflowVersion')
        .mockResolvedValue(1)

      const generateWorkflowSubversion = jest
        .spyOn(service, 'generateWorkflowSubversion')
        .mockResolvedValue(0)

      const validateWorkflowPeriodSpy = jest
        .spyOn(service, 'validateWorkflowPeriod')
        .mockImplementation(() => Promise.resolve())

      const mockCreate = mockModel.create.mockRejectedValue(new Error())

      const createTasksSpy = jest
        .spyOn(service, 'createTasks')
        .mockImplementation(() => Promise.resolve())

      const saveHistorySpy = jest
        .spyOn(service, 'saveHistory')
        .mockImplementationOnce(() => Promise.resolve())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.create(createDto, userId, undefined, transaction as any)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(InternalServerErrorException)

      expect(findWorkflowTypeByIdSpy).toHaveBeenCalledTimes(1)
      expect(generateWorkflowVersionSpy).toHaveBeenCalledTimes(1)
      expect(generateWorkflowSubversion).toHaveBeenCalledTimes(1)
      expect(validateWorkflowPeriodSpy).toHaveBeenCalledTimes(1)
      expect(mockCreate).toHaveBeenCalledTimes(1)
      expect(createTasksSpy).toHaveBeenCalledTimes(0)
      expect(saveHistorySpy).toHaveBeenCalledTimes(0)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should create the workflow and commit', async () => {
      const expectedResponse = 1
      const findWorkflowTypeByIdSpy = jest
        .spyOn(service, 'findWorkflowTypeById')
        .mockResolvedValue(typeData)

      const generateWorkflowVersionSpy = jest
        .spyOn(service, 'generateWorkflowVersion')
        .mockResolvedValue(1)

      const generateWorkflowSubversion = jest
        .spyOn(service, 'generateWorkflowSubversion')
        .mockResolvedValue(0)

      const validateWorkflowPeriodSpy = jest
        .spyOn(service, 'validateWorkflowPeriod')
        .mockImplementation(() => Promise.resolve())

      const mockCreate = mockModel.create.mockResolvedValue({
        id: expectedResponse
      })

      const createTasksSpy = jest
        .spyOn(service, 'createTasks')
        .mockImplementation(() => Promise.resolve())

      const saveHistorySpy = jest
        .spyOn(service, 'saveHistory')
        .mockImplementationOnce(() => Promise.resolve())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      const response = await service.create(createDto, userId)

      expect(response).toEqual(expectedResponse)

      expect(findWorkflowTypeByIdSpy).toHaveBeenCalledTimes(1)
      expect(findWorkflowTypeByIdSpy).toHaveBeenCalledWith(
        createDto.typeId,
        transaction
      )

      expect(generateWorkflowVersionSpy).toHaveBeenCalledTimes(1)
      expect(generateWorkflowVersionSpy).toHaveBeenCalledWith(
        createDto.typeId,
        transaction
      )

      expect(generateWorkflowSubversion).toHaveBeenCalledTimes(1)
      expect(generateWorkflowSubversion).toHaveBeenCalledWith(
        createDto.typeId,
        undefined,
        transaction
      )

      expect(validateWorkflowPeriodSpy).toHaveBeenCalledTimes(1)

      expect(mockCreate).toHaveBeenCalledTimes(1)

      expect(createTasksSpy).toHaveBeenCalledTimes(1)
      expect(createTasksSpy).toHaveBeenCalledWith(
        expectedResponse,
        createDto.tasks,
        transaction
      )

      expect(saveHistorySpy).toHaveBeenCalledTimes(1)
      expect(saveHistorySpy).toHaveBeenCalledWith(
        id,
        'Workflow criado',
        transaction
      )

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should create the workflow and commit when is a new subversion of an existent workflow', async () => {
      const expectedResponse = 1
      const version = 1
      const findWorkflowTypeByIdSpy = jest
        .spyOn(service, 'findWorkflowTypeById')
        .mockResolvedValue(typeData)

      const generateWorkflowVersionSpy = jest
        .spyOn(service, 'generateWorkflowVersion')
        .mockResolvedValue(1)

      const generateWorkflowSubversion = jest
        .spyOn(service, 'generateWorkflowSubversion')
        .mockResolvedValue(0)

      const validateWorkflowPeriodSpy = jest
        .spyOn(service, 'validateWorkflowPeriod')
        .mockImplementation(() => Promise.resolve())

      const mockCreate = mockModel.create.mockResolvedValue({
        id: expectedResponse
      })

      const createTasksSpy = jest
        .spyOn(service, 'createTasks')
        .mockImplementation(() => Promise.resolve())

      const saveHistorySpy = jest
        .spyOn(service, 'saveHistory')
        .mockImplementationOnce(() => Promise.resolve())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      const response = await service.create(
        createDto,
        userId,
        version,
        transaction as any
      )

      expect(response).toEqual(expectedResponse)

      expect(findWorkflowTypeByIdSpy).toHaveBeenCalledTimes(1)
      expect(findWorkflowTypeByIdSpy).toHaveBeenCalledWith(
        createDto.typeId,
        transaction
      )

      expect(generateWorkflowVersionSpy).toHaveBeenCalledTimes(0)

      expect(generateWorkflowSubversion).toHaveBeenCalledTimes(1)
      expect(generateWorkflowSubversion).toHaveBeenCalledWith(
        createDto.typeId,
        version,
        transaction
      )

      expect(validateWorkflowPeriodSpy).toHaveBeenCalledTimes(1)

      expect(mockCreate).toHaveBeenCalledTimes(1)

      expect(createTasksSpy).toHaveBeenCalledTimes(1)
      expect(createTasksSpy).toHaveBeenCalledWith(
        expectedResponse,
        createDto.tasks,
        transaction
      )

      expect(saveHistorySpy).toHaveBeenCalledTimes(0)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })
  })

  describe('createTasks', () => {
    it('should create tasks with conditions', async () => {
      const validateOrdersSpy = jest
        .spyOn(service, 'validateOrders')
        .mockImplementation()

      const validateTitlesSpy = jest
        .spyOn(service, 'validateTitles')
        .mockImplementation()

      const createSpy = mockModel.create.mockResolvedValue(1)

      const validateResponsesNextTaskOrdersSpy = jest
        .spyOn(service, 'validateResponsesNextTaskOrders')
        .mockImplementation()

      const createConditionsSpy = jest
        .spyOn(service, 'createConditions')
        .mockImplementation()

      const createResponsesSpy = jest
        .spyOn(service, 'createResponses')
        .mockImplementation()

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      await service.createTasks(id, [taskDto], transaction as any)

      expect(validateOrdersSpy).toHaveBeenCalledTimes(3)
      expect(validateTitlesSpy).toHaveBeenCalledTimes(2)
      expect(createSpy).toHaveBeenCalledTimes(1)
      expect(validateResponsesNextTaskOrdersSpy).toHaveBeenCalledTimes(1)
      expect(createConditionsSpy).toHaveBeenCalledTimes(1)
      expect(createResponsesSpy).toHaveBeenCalledTimes(1)
    })

    it('should create tasks with no conditions', async () => {
      const validateOrdersSpy = jest
        .spyOn(service, 'validateOrders')
        .mockImplementation()

      const validateTitlesSpy = jest
        .spyOn(service, 'validateTitles')
        .mockImplementation()

      const createSpy = mockModel.create.mockResolvedValue(1)

      const validateResponsesNextTaskOrdersSpy = jest
        .spyOn(service, 'validateResponsesNextTaskOrders')
        .mockImplementation()

      const createConditionsSpy = jest
        .spyOn(service, 'createConditions')
        .mockImplementation()

      const createResponsesSpy = jest
        .spyOn(service, 'createResponses')
        .mockImplementation()

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      await service.createTasks(
        id,
        [{ ...taskDto, conditions: [] }],
        transaction as any
      )

      expect(validateOrdersSpy).toHaveBeenCalledTimes(3)
      expect(validateTitlesSpy).toHaveBeenCalledTimes(2)
      expect(createSpy).toHaveBeenCalledTimes(1)
      expect(validateResponsesNextTaskOrdersSpy).toHaveBeenCalledTimes(1)
      expect(createConditionsSpy).toHaveBeenCalledTimes(1)
      expect(createResponsesSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('createResponses', () => {
    it('should create responses', async () => {
      const createSpy = mockModel.bulkCreate.mockImplementation(() =>
        Promise.resolve()
      )

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      await service.createResponses(
        [{ ...responseDto, workflowTaskId: 1 }],
        transaction as any
      )

      expect(createSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('createConditions', () => {
    it('should create conditions', async () => {
      const createSpy = mockModel.bulkCreate.mockImplementation(() =>
        Promise.resolve()
      )

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      await service.createConditions(
        [{ ...conditionDto, workflowTaskId: 1 }],
        transaction as any
      )

      expect(createSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getTypes', () => {
    it('Should return workflow types', async () => {
      const findAllSpy = mockModel.findAll.mockResolvedValue([typeData])

      const workflowTypes = await service.getTypes()

      expect(workflowTypes).not.toHaveLength(0)
      expect(workflowTypes).toContain(typeData)
      expect(findAllSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getWorkflowTypeAccess', () => {
    it('Should return workflow type accesses', async () => {
      const findAllSpy = mockModel.findAll.mockResolvedValue([typeAccessData])

      const workflowTypes = await service.getWorkflowTypeAccess(id)

      expect(workflowTypes).not.toHaveLength(0)
      expect(workflowTypes).toContain(accessData)
      expect(findAllSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getWorkflowLastVersion', () => {
    it('should return undefined when workflow is not found', async () => {
      const findOneSpy = mockModel.findOne.mockResolvedValue(undefined)

      const response = await service.getWorkflowLastVersion(1)

      expect(response).toBeUndefined()
      expect(findOneSpy).toHaveBeenCalledTimes(1)
    })

    it('should return the version', async () => {
      const findOneSpy = mockModel.findOne.mockResolvedValue(workflowData)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      const response = await service.getWorkflowLastVersion(
        1,
        transaction as any
      )

      expect(response).toEqual(workflowData.version)
      expect(findOneSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getWorkflowLastSubversion', () => {
    it('should return undefined when workflow is not found', async () => {
      const findOneSpy = mockModel.findOne.mockResolvedValue(undefined)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      const response = await service.getWorkflowLastSubversion(
        1,
        1,
        transaction as any
      )

      expect(response).toBeUndefined()
      expect(findOneSpy).toHaveBeenCalledTimes(1)
    })

    it('should return the subversion', async () => {
      const findOneSpy = mockModel.findOne.mockResolvedValue(workflowData)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      const response = await service.getWorkflowLastSubversion(
        1,
        1,
        transaction as any
      )

      expect(response).toEqual(workflowData.subversion)
      expect(findOneSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('findByIdWithIncludes', () => {
    it('should return the workflow with relations', async () => {
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(workflowData)

      const response = await service.findByIdWithIncludes(1)

      expect(response).toEqual(workflowData)
      expect(findByPkSpy).toHaveBeenCalledTimes(1)
    })

    it('should return the workflow with relations when called with transaction', async () => {
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(workflowData)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      const response = await service.findByIdWithIncludes(1, transaction as any)

      expect(response).toEqual(workflowData)
      expect(findByPkSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getWorkflowHistories', () => {
    it('should return workflow histories', async () => {
      const findAllSpy = mockModel.findAll.mockResolvedValue([historyData])

      const response = await service.getWorkflowHistories(1, 1, 1)

      expect(response).not.toHaveLength(0)
      expect(response[0]).toEqual(historyData.toJSON())
      expect(findAllSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('findWorkflowTypeById', () => {
    it('should return workflow type', async () => {
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(typeData)

      const response = await service.findWorkflowTypeById(1)

      expect(response).toEqual(typeData)
      expect(findByPkSpy).toHaveBeenCalledTimes(1)
    })

    it('should return workflow type when called with a transaction', async () => {
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(typeData)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      const response = await service.findWorkflowTypeById(1, transaction as any)

      expect(response).toEqual(typeData)
      expect(findByPkSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('generateWorkflowVersion', () => {
    it('should generate a new workflow version when there is no workflow with the specified type', async () => {
      const getWorkflowLastVersionSpy = jest
        .spyOn(service, 'getWorkflowLastVersion')
        .mockResolvedValue(undefined)

      const response = await service.generateWorkflowVersion(1)

      expect(response).toEqual(1)
      expect(getWorkflowLastVersionSpy).toHaveBeenCalledTimes(1)
    })

    it('should generate a new workflow version when there is a workflow with the specified type', async () => {
      const lastVersion = 1
      const getWorkflowLastVersionSpy = jest
        .spyOn(service, 'getWorkflowLastVersion')
        .mockResolvedValue(lastVersion)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      const response = await service.generateWorkflowVersion(
        1,
        transaction as any
      )

      expect(response).toEqual(lastVersion + 1)
      expect(getWorkflowLastVersionSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('generateWorkflowSubversion', () => {
    it('should generate a new workflow subversion when there is no version', async () => {
      const getWorkflowLastSubversionSpy = jest
        .spyOn(service, 'getWorkflowLastSubversion')
        .mockResolvedValue(1)

      const response = await service.generateWorkflowSubversion(1)

      expect(response).toEqual(0)
      expect(getWorkflowLastSubversionSpy).toHaveBeenCalledTimes(0)
    })

    it('should generate a new workflow subversion when there is a workflow with the specified type', async () => {
      const lastSubversion = 1
      const getWorkflowLastSubversionSpy = jest
        .spyOn(service, 'getWorkflowLastSubversion')
        .mockResolvedValue(lastSubversion)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      const response = await service.generateWorkflowSubversion(
        1,
        1,
        transaction as any
      )

      expect(response).toEqual(lastSubversion + 1)
      expect(getWorkflowLastSubversionSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('formatWorkflowVersion', () => {
    it('should format workflow version 1', () => {
      const type = WorkflowTypeEnum.VPC
      const version = 1
      const subversion = 1

      const expectedFormattedVersion = 'VPC.1.01'

      const formattedVersion = service.formatWorkflowVersion(
        type,
        version,
        subversion
      )

      expect(formattedVersion).toEqual(expectedFormattedVersion)
    })

    it('should format workflow version > 9 and subversion > 99', () => {
      const type = WorkflowTypeEnum.VPC
      const version = 10
      const subversion = 100

      const expectedFormattedVersion = 'VPC.10.100'

      const formattedVersion = service.formatWorkflowVersion(
        type,
        version,
        subversion
      )

      expect(formattedVersion).toEqual(expectedFormattedVersion)
    })
  })

  describe('validateResponsesNextTaskOrders', () => {
    it('should throw a bad request error if a next task order does not exist', () => {
      const tasks = [1, 2, 3]
      const nextTasksOrders = [2, 3, 4]
      let error = null

      try {
        service.validateResponsesNextTaskOrders(tasks, nextTasksOrders)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual('A próxima tarefa de número 4 é inválida')
    })

    it('should not throw a bad request error if all next task orders exist', () => {
      const tasks = [1, 2, 3]
      const nextTasksOrders = [2, 3]
      let error = null

      try {
        service.validateResponsesNextTaskOrders(tasks, nextTasksOrders)
      } catch (err) {
        error = err
      }

      expect(error).toBeNull()
    })
  })

  describe('validateOrders', () => {
    it('should throw a bad request error when the order is invalid', () => {
      const orders = [1, 2, 3, 5]
      let error = null

      try {
        service.validateOrders(orders)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual(
        'As tarefas ou respostas não estão em ordem correta (5)'
      )
    })

    it('should not throw a bad request error when the order valid', () => {
      const orders = [1, 2, 3, 4]
      let error = null

      try {
        service.validateOrders(orders)
      } catch (err) {
        error = err
      }

      expect(error).toBeNull()
    })
  })

  describe('validateTitles', () => {
    it('should throw a bad request error when the titles are duplicated', () => {
      const titles = ['test', 'test']
      let error = null

      try {
        service.validateTitles(titles)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual('Os títulos não devem ser iguais')
    })

    it('should not throw a bad request error when the titles are not equal', () => {
      const titles = ['test', 'test 2']
      let error = null

      try {
        service.validateTitles(titles)
      } catch (err) {
        error = err
      }

      expect(error).toBeNull()
    })
  })

  describe('validateWorkflowPeriod', () => {
    it('should throw a bad request error when the period is already in use', async () => {
      const typeId = 1
      const dateStart = new Date()
      const dateEnd = new Date()
      let error = null

      const findOneSpy = mockModel.findOne.mockResolvedValue(workflowData)

      try {
        await service.validateWorkflowPeriod(typeId, dateStart, dateEnd)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual('O período informado já está em uso')

      expect(findOneSpy).toHaveBeenCalledTimes(1)
    })

    it('should not throw a bad request error when the period is available', async () => {
      const typeId = 1
      const dateStart = new Date()
      const dateEnd = new Date()
      let error = null

      const findOneSpy = mockModel.findOne.mockResolvedValue(undefined)

      try {
        await service.validateWorkflowPeriod(typeId, dateStart, dateEnd)
      } catch (err) {
        error = err
      }

      expect(error).toBeNull()
      expect(findOneSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('saveHistory', () => {
    it('should create a workflow history record', async () => {
      const workflowId = 1
      const updatedFields = ''
      const transaction = DatabaseProviderMock.useFactory().transaction()

      const createSpy = mockModel.create.mockResolvedValue(workflowData)

      await service.saveHistory(workflowId, updatedFields, transaction as any)

      expect(createSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getWorkflowTasks', () => {
    it('should return workflow tasks', async () => {
      const workFlowData = {
        ...workflowData,
        tasks: [taskData[0]]
      }
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(workFlowData)

      const response = await service.getWorkFlowTasks(1)

      expect(findByPkSpy).toHaveBeenCalledTimes(1)
      expect(response).toEqual(workFlowData.tasks)
    })

    it('should throw bad request exception', async () => {
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(null)
      let error
      try {
        await service.getWorkFlowTasks(1)
      } catch (err) {
        error = err
      }
      expect(findByPkSpy).toHaveBeenCalledTimes(1)
      expect(error).not.toBeUndefined()
      expect(error).toBeInstanceOf(BadRequestException)
    })
  })

  describe('getWorkFlowsByType', () => {
    it('should return WorkflowVersions', async () => {
      const expectedResponse = [
        {
          id: 1,
          version: 'VPC.1.00'
        }
      ]
      const findByPkSpy = mockModel.findOne.mockResolvedValue(typeData)
      const findAllSpy = mockModel.findAll.mockResolvedValue([workflowData])

      const response = await service.getWorkFlowVersionsByType(1)

      expect(response).toEqual(expectedResponse)
      expect(findByPkSpy).toHaveBeenCalledTimes(1)
      expect(findAllSpy).toHaveBeenCalledTimes(1)
    })

    it('should throw bad request exception', async () => {
      const findByPkSpy = mockModel.findByPk.mockResolvedValue(null)
      let error
      try {
        await service.getWorkFlowTasks(1)
      } catch (err) {
        error = err
      }
      expect(findByPkSpy).toHaveBeenCalledTimes(1)
      expect(error).not.toBeUndefined()
      expect(error).toBeInstanceOf(BadRequestException)
    })
  })
})
