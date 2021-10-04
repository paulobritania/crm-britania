import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { Access } from '../accesses/entities/access.entity'
import { Field } from '../fields/entities/field.entity'
import { Permission } from '../permissions/entities/permission.entity'
import { User } from '../users/entities/user.entity'
import { UserProfile } from '../users/entities/userProfile.entity'
import { CreateProfileDto } from './dto/createProfile.dto'
import { SearchProfileAutocompleteDto } from './dto/search-autocomplete.dto'
import { UpdateProfileDto } from './dto/updateProfile.dto'
import { Profile } from './entities/profile.entity'
import { ProfileAccess } from './entities/profileAccess.entity'
import { ProfileAccessException } from './entities/profileAccessException.entity'
import { ProfileMicro } from './entities/profileMicro.entity'
import { ProfilePermission } from './entities/profilePermission.entity'
import { ProfilesService } from './profiles.service'

describe('ProfilesService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: ProfilesService
  let newProfile: CreateProfileDto
  let emptyNewProfile: CreateProfileDto
  let accesses: any
  let permissions: any
  let micros: any
  let exceptions: any
  let userProfiles: any

  const userId = 1

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }

    accesses = [
      {
        id: 1,
        profileId: 1,
        accessId: 10
      }
    ]

    permissions = [
      {
        id: 1,
        profileId: 1,
        permissionId: 1
      }
    ]

    micros = [
      {
        id: 1,
        profileId: 1,
        fieldId: 1
      }
    ]

    exceptions = [
      {
        id: 1,
        profileId: 1,
        permissionId: 1,
        accessId: 1
      }
    ]

    userProfiles = [
      {
        userId: 1,
        profileId: 1,
        createdBy: 1
      }
    ]

    newProfile = {
      name: 'Profile 1',
      active: true,
      permissions,
      access: accesses,
      micros,
      exceptions,
      users: userProfiles
    }

    emptyNewProfile = {
      name: '',
      active: true,
      permissions: [],
      access: [],
      micros,
      exceptions,
      users: userProfiles
    }

  })

  beforeEach(async () => {
    mockModel = MockModel()
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot()
      ],
      providers: [
        DatabaseProviderMock,
        ProfilesService,
        {
          provide: getModelToken(Profile),
          useValue: mockModel
        },
        {
          provide: getModelToken(ProfilePermission),
          useValue: mockModel
        },
        {
          provide: getModelToken(ProfileAccess),
          useValue: mockModel
        },
        {
          provide: getModelToken(ProfileMicro),
          useValue: mockModel
        },
        {
          provide: getModelToken(ProfileAccessException),
          useValue: mockModel
        },
        {
          provide: getModelToken(UserProfile),
          useValue: mockModel
        },
        {
          provide: getModelToken(User),
          useValue: mockModel
        },
        {
          provide: getModelToken(Field),
          useValue: mockModel
        },
        {
          provide: getModelToken(Access),
          useValue: mockModel
        },
        {
          provide: getModelToken(Permission),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<ProfilesService>(ProfilesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })


  describe('Profile CRUD operations', () => {
    it('should list all profiles', async () => {
      const profiles = [
        {
          id: 1,
          name: 'Profile 1',
          active: true
        },
        {
          id: 2,
          name: 'Profile 2',
          active: false
        }
      ]

      const options: SearchProfileAutocompleteDto = {
        name: '',
        limit: '',
        offset: ''
      }

      mockModel.findAll.mockReturnValue(profiles)
      const result = await service.findAll(options)

      expect(result.length).toBe(2)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('active')
      expect(result[1].name).toEqual('Profile 2')
    })

    it('should list profiles with pagination and name filter', async () => {
      const profiles = [
        {
          id: 1,
          name: 'Profile 1',
          active: true
        },
        {
          id: 2,
          name: 'Profile 2',
          active: false
        }
      ]

      const options: SearchProfileAutocompleteDto = {
        name: 'Profile',
        limit: '2',
        offset: '0'
      }

      mockModel.findAll.mockReturnValue(profiles)
      const result = await service.findAll(options)

      expect(result.length).toBe(2)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('active')
      expect(result[1].name).toEqual('Profile 2')
    })

    it('should list an profile', async () => {
      const profile = {
        id: 1,
        name: 'Profile 1',
        active: true,
        permission: [],
        access: [],
        micro: [],
        exception: [],
        userProfile: []
      }

      mockModel.findOne.mockReturnValue(profile)
      const result = await service.findById(profile.id)
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('active')
      expect(result).toHaveProperty('permission')
      expect(result).toHaveProperty('access')
      expect(result).toHaveProperty('micro')
      expect(result).toHaveProperty('exception')
      expect(result).toHaveProperty('userProfile')
    })

    it('should create an profile, commit operation and return the new user ID', async () => {
      const value = { id: 1, get: jest.fn() }
      mockModel.create.mockReturnValue(value)

      const result = await service.create(newProfile, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBe(1)
    })

    it('should create an profile with all optional values null', async () => {
      const value = { id: 1, get: jest.fn() }
      mockModel.create.mockReturnValue(value)

      const newProfileTest = {
        name: 'Profile 1',
        active: true,
        permissions,
        access: accesses,
        micros: null,
        exceptions: null,
        users: null
      }

      const result = await service.create(newProfileTest, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBe(1)
    })

    it('should NOT create an profile because his values isnt valid', async () => {
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.create(emptyNewProfile, userId)
      } catch (error) {
        expect(error.message).toEqual('Ocorreu um erro ao criar o perfil')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should update an profile, commit the operation and return it', async () => {
      const profileId = 1
      const mockProfile: UpdateProfileDto = {
        name: 'Profile 1',
        active: true,
        exceptions,
        micros,
        permissions,
        access: accesses,
        users: userProfiles
      }
      const updatedProfile: UpdateProfileDto = {
        name: 'Profile 1 - updated',
        active: true,
        exceptions,
        micros,
        permissions,
        access: accesses,
        users: userProfiles
      }

      mockModel.findByPk.mockReturnValue({
        ...mockProfile,
        get: jest.fn(),
        destroy: jest.fn(),
        reload: jest.fn(() => updatedProfile),
        upsert: jest.fn()
      })

      const result = await service.update(profileId, mockProfile, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toHaveProperty('name')
      expect(result.name).toEqual('Profile 1 - updated')
    })

    it('should update an profile with all optional values null', async () => {
      const profileId = 1
      const mockProfile: UpdateProfileDto = {
        name: 'Profile 1',
        active: true,
        permissions,
        access: accesses,
        micros: null,
        exceptions: null,
        users: null
      }

      mockModel.findByPk.mockReturnValue({
        ...mockProfile,
        get: jest.fn(),
        destroy: jest.fn(),
        reload: jest.fn(() => mockProfile),
        upsert: jest.fn()
      })

      const result = await service.update(profileId, mockProfile, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toHaveProperty('name')
    })

    it('should NOT update an profile because it does not exist', async() => {
      const profileId = 1
      const mockProfile: UpdateProfileDto = {
        name: 'Profile 1',
        active: true,
        permissions,
        access: accesses,
        micros: null,
        exceptions: null,
        users: null
      }

      const transaction = DatabaseProviderMock.useFactory().transaction()
      mockModel.findByPk.mockReturnValue(null)
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.update(profileId, mockProfile, userId)
      } catch (error) {
        expect(error.message).toEqual('Perfil não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should NOT update an profile because his values isnt valid', async() => {
      const profileId = 1

      const transaction = DatabaseProviderMock.useFactory().transaction()
      mockModel.findByPk.mockReturnValue(null)
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.update(profileId, emptyNewProfile, userId)
      } catch (error) {
        expect(error.message).toEqual('Perfil não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should delete an profile and commit the operation', async () => {
      const mockProfile = {
        id: 1,
        exceptions,
        micros,
        permissions,
        accesses,
        userProfiles,
        get: jest.fn(),
        destroy: jest.fn()
      }

      mockModel.findByPk.mockReturnValue(mockProfile)
      mockModel.findAll.mockReturnValueOnce(mockProfile.exceptions)
        .mockReturnValueOnce(mockProfile.micros)
        .mockReturnValueOnce(mockProfile.accesses)
        .mockReturnValueOnce(mockProfile.permissions)
        .mockReturnValueOnce(mockProfile.userProfiles)
      mockModel.destroy.mockReturnValue(mockProfile.id)

      const result = await service.delete(mockProfile.id, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBeUndefined()
    })

    it('should delete an profile with all values null', async () => {
      const mockProfile = {
        id: 1,
        permissions: null,
        accesses: null,
        exceptions: null,
        micros: null,
        userProfiles: null,
        get: jest.fn(),
        destroy: jest.fn()
      }

      mockModel.findByPk.mockReturnValue(mockProfile)
      mockModel.findAll.mockReturnValueOnce(mockProfile.exceptions)
        .mockReturnValueOnce(mockProfile.micros)
        .mockReturnValueOnce(mockProfile.accesses)
        .mockReturnValueOnce(mockProfile.permissions)
        .mockReturnValueOnce(mockProfile.userProfiles)
      mockModel.destroy.mockReturnValue(mockProfile.id)

      const result = await service.delete(mockProfile.id, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBeUndefined()
    })

    it('should NOT delete an profile because it does not exist', async () => {
      const profileId = 1
      const transaction = DatabaseProviderMock.useFactory().transaction()
      mockModel.findByPk.mockReturnValue(null)
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.delete(profileId, userId)
      } catch (error) {
        expect(error.message).toEqual('Perfil não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should update an profile status, commit the operation and return it', async () => {
      const profile = {
        id: 1,
        name: 'Profile 1',
        active: false
      }

      const profileUpdated = [
        1,
        [
          {
            id: 1,
            name: 'Profile 1',
            active: true
          }
        ]
      ]

      mockModel.findByPk.mockReturnValue(profile)
      mockModel.update.mockReturnValue(profileUpdated)
      const result = await service.updateStatus(profile.id)
      const transaction = DatabaseProviderMock.useFactory().transaction()
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('active')
      expect(result.active).toEqual(true)
    })

    it('should NOT update an profile status becaus it does not exist', async() => {
      const profileId = 1
      const transaction = DatabaseProviderMock.useFactory().transaction()
      mockModel.findByPk.mockReturnValue(null)
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.updateStatus(profileId)
      } catch (error) {
        expect(error.message).toEqual('Perfil não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

  })
})
