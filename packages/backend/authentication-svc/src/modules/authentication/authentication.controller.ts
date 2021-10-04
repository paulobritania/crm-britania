import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthenticationService } from './authentication.interface'
import { AuthenticateDto } from './dto/authenticate.dto'
import { Token } from './dto/token.dto'

@Controller()
@ApiTags('Auth')
export class AuthenticationController {
  @Inject('AuthenticationService') private readonly authService: AuthenticationService

  @ApiOkResponse({
    description: 'Authenticated',
    isArray: false
  })
  @Post()
  async login(@Body() data: AuthenticateDto): Promise<Token> {
    return this.authService.login(data)
  }
}
