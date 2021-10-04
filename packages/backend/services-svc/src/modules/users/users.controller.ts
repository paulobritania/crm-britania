import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiResponse
} from '@nestjs/swagger'

import {
  AccessNotRequired,
  BritaniaAuth,
  InternalRoute,
  JwtAuthGuard,
  PublicRoute,
  RequiredAccess,
  RequiredPermission
} from '@britania-crm-com/auth-utils'

import { QueryUtilsDto } from '../../utils/dto/queryUtils'
import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { UserRegionalManagerDto } from '../hierarchy/dtos/userRegionalManager.dto'
import { UserRegionalManagersQuery } from '../hierarchy/dtos/userRegionalManagersQuery.dto'
import { RepresentativeDto } from '../representatives/dtos/representative.dto'
import { RepresentativeQueryStringDto } from '../representatives/dtos/representativesQueryString'
import { RepresentativesResponseDto } from '../representatives/dtos/representativesResponse.dto'
import { GetUserProfilesDetailsResponseDto } from './dto/getUserProfilesDetailsResponse.dto'
import { GetUserProfilesResponseDto } from './dto/getUserProfilesResponse.dto'
import { UserAutocompleteResponseDto } from './dto/user.autocomplete.response.dto'
import { UserAutocompleteSearchDto } from './dto/user.autocomplete.search.dto'
import { UserDto } from './dto/user.dto'
import { CreateUserDto } from './dto/userCreate.dto'
import { UpdateUserProfilesDto } from './dto/userProfiles.dto'
import { UpdateUserDto } from './dto/userUpdate.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
@RequiredAccess(AccessesEnum.CONTROLE_DE_USUARIO)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Logged User Profiles',
    type: GetUserProfilesResponseDto,
    isArray: false
  })
  @AccessNotRequired()
  @Get('personal/profiles')
  getPersonalProfiles(
    @BritaniaAuth(['userId']) userId: number
  ): Promise<GetUserProfilesResponseDto> {
    return this.usersService.getUserProfiles(userId)
  }

  @ApiOkResponse({
    description: 'List of users',
    type: UserDto,
    isArray: true
  })
  @Get()
  findAll(@Param() query: QueryUtilsDto): Promise<UserDto[]> {
    return this.usersService.findAll(query)
  }

  @ApiOkResponse({
    description: 'List of searched users for autocomplete',
    type: UserAutocompleteResponseDto,
    isArray: true
  })
  @AccessNotRequired()
  @Get('autocomplete')
  autocomplete(
    @Query() query: UserAutocompleteSearchDto
  ): Promise<UserAutocompleteResponseDto[]> {
    return this.usersService.autocomplete(query)
  }

  @ApiOkResponse({
    description: 'User registered successfully',
    type: CreateUserDto,
    isArray: false
  })
  @Post()
  @RequiredPermission(PermissionsEnum.INCLUIR)
  create(
    @Body() data: CreateUserDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.usersService.create(data, userId)
  }

  @ApiOkResponse({
    description: 'User updated successfully',
    type: UpdateUserDto,
    isArray: false
  })
  @Patch(':id')
  @RequiredPermission(PermissionsEnum.EDITAR)
  update(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<User> {
    return this.usersService.update(id, data, userId)
  }

  @ApiOkResponse({
    description: 'User deleted successfully',
    isArray: false
  })
  @Delete(':id')
  @RequiredPermission(PermissionsEnum.EXCLUIR)
  delete(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.usersService.delete(id, userId)
  }

  @ApiNoContentResponse({ description: 'User profiles updated successfully' })
  @Put(':id/profiles')
  @HttpCode(204)
  @RequiredPermission(PermissionsEnum.EDITAR)
  updateUserProfiles(
    @Param('id') id: number,
    @Body() data: UpdateUserProfilesDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.usersService.updateUserProfiles(id, data, userId)
  }

  @ApiResponse({
    status: 200,
    type: RepresentativesResponseDto,
    description: 'list of representatives',
    isArray: true
  })
  @Get('representatives')
  findRepresentatives(
    @Query() query: RepresentativeQueryStringDto,
    @BritaniaAuth('userId') userId: number,
    @BritaniaAuth('tokenBritania') tokenBritania: string
  ): Promise<RepresentativeDto[]> {
    return this.usersService.getAllRepresentatives(query, userId, tokenBritania)
  }

  @ApiOkResponse({
    description: 'User',
    type: UserDto,
    isArray: false
  })
  @Get(':id')
  findById(
    @Param('id') id: number,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<UserDto> {
    return this.usersService.findById(id, tokenBritania)
  }

  @ApiOkResponse({
    description: 'User profiles',
    type: GetUserProfilesResponseDto,
    isArray: false
  })
  @Get(':id/profiles')
  getUserProfiles(
    @Param('id') id: number
  ): Promise<GetUserProfilesResponseDto> {
    return this.usersService.getUserProfiles(id)
  }

  @ApiOkResponse({
    description: 'User profiles',
    type: GetUserProfilesResponseDto,
    isArray: false
  })
  @Get(':id/profiles/details')
  @InternalRoute()
  getUserProfilesDetails(
    @Param('id') id: number
  ): Promise<GetUserProfilesDetailsResponseDto[]> {
    return this.usersService.getUserProfilesDetails(id)
  }

  @Get('/username/:username')
  @PublicRoute()
  async getUserFromUsernameMessage(
    @Param('username') username: string
  ): Promise<any> {
    return this.usersService.findByUsername(username)
  }

  @ApiOkResponse({
    description: 'Logged User',
    type: UserDto,
    isArray: false
  })
  @AccessNotRequired()
  @Get('personal/data')
  getPersonalData(
    @BritaniaAuth(['tokenBritania']) tokenBritania: string,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<UserDto> {
    return this.usersService.findById(userId, tokenBritania)
  }

  @ApiOkResponse({
    description: 'List Regional Managers that the user has access to',
    type: UserRegionalManagerDto,
    isArray: true
  })
  @AccessNotRequired()
  @Get('personal/regional-managers')
  getUserRegionalManagers(
    @Query() query: UserRegionalManagersQuery,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<UserRegionalManagerDto[]> {
    return this.usersService.getUserRegionalManagers(userId, query)
  }
}
