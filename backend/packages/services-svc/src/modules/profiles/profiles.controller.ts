import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Patch,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'

import {
  JwtAuthGuard,
  BritaniaAuth,
  RequiredAccess,
  RequiredPermission,
  AccessNotRequired
} from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { CreateProfileDto } from './dto/createProfile.dto'
import { SearchProfileAutocompleteDto } from './dto/search-autocomplete.dto'
import { UpdateProfileDto } from './dto/updateProfile.dto'
import { Profile } from './entities/profile.entity'
import { ProfilesService } from './profiles.service'

@ApiTags('Profiles')
@Controller('profiles')
@UseGuards(JwtAuthGuard)
@RequiredAccess(AccessesEnum.CONTROLE_DE_PERFIL)
@ApiBearerAuth()
export class ProfilesController {
  constructor(
    @Inject('ProfilesService') private readonly profilesService: ProfilesService
  ) {}

  @ApiOkResponse({
    description: 'List of profiles',
    type: Profile,
    isArray: true
  })
  @Get()
  @AccessNotRequired()
  findAll(@Query() query: SearchProfileAutocompleteDto): Promise<Profile[]> {
    return this.profilesService.findAll(query)
  }

  @ApiOkResponse({
    description: 'Profile returned successfully',
    isArray: false
  })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Profile> {
    return this.profilesService.findById(id)
  }

  @ApiOkResponse({
    description: 'Profile registered successfully',
    type: CreateProfileDto,
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @Post()
  async create(
    @Body() data: CreateProfileDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.profilesService.create(data, userId)
  }

  @ApiOkResponse({
    description: 'Profile updated successfully',
    type: UpdateProfileDto,
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProfileDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<Profile> {
    return this.profilesService.update(id, data, userId)
  }

  @ApiOkResponse({
    description: 'Profile status updated successfully',
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.INATIVAR)
  @Patch('status/:id')
  async updateStatus(@Param('id') id: number): Promise<Profile> {
    return this.profilesService.updateStatus(id)
  }

  @ApiOkResponse({
    description: 'Profile deleted successfully',
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.EXCLUIR)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.profilesService.delete(id, userId)
  }
}
