import {
  Controller,
  UseGuards,
  Post,
  Get,
  Body,
  Query,
  Param,
  Put,
  Res,
  Header,
  Response
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'

import { BritaniaAuth, JwtAuthGuard } from '@britania-crm-com/auth-utils'

import { BuyersService } from './buyers.service'
import { CreateBuyerDto } from './dto/create/createBuyer.dto'
import { FindAllBuyersQueryDto } from './dto/find/findAllBuyersQuery.dto'
import { FindAllBuyerReturnDto } from './dto/find/findAllBuyersReturn.dto'
import { FindMatrixDto } from './dto/find/findMatrixQuery.dto'
import { FindMatrixReturnDto } from './dto/find/findMatrixReturn.dto'
import { UpdateBuyerDto } from './dto/update/updateBuyer.dto'
import { Buyer } from './entities/buyer.entity'

@ApiTags('Buyers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  /**
   * Irá cadastrar o comprador
   * @param query CreateBuyerDto
   */
  @ApiResponse({
    type: CreateBuyerDto,
    status: 200
  })
  @Post()
  create(
    @Body() data: CreateBuyerDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.buyersService.createBuyer(data, userId)
  }

  /**
   * Irá buscar as informações da Matriz
   * @param query FindMatrixDto
   */
  @ApiResponse({
    description: 'List of Matrix',
    type: FindMatrixDto,
    status: 200
  })
  @Get('matrix')
  findMatrix(
    @Query() query: FindMatrixDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<FindMatrixReturnDto[]> {
    return this.buyersService.getMatrix(query, tokenBritania)
  }

  /**
   * Irá retornar um booleano com base na existência de um comprador ativo com
   * o CPF informado
   * @param query boolean
   */
  @ApiResponse({
    description: 'Return a boolean based cpf exists in other Buyer active',
    status: 200
  })
  @Get('existence-buyer/:cpf')
  findExistenceBuyerByCpf(@Param('cpf') cpf: string): Promise<boolean> {
    return this.buyersService.getExistenceBuyerByCpf(cpf)
  }

  /**
   * Irá listar todos os compradores com suas respectivas linhas
   * o CPF informado
   * @param query FindAllBuyerReturnDto
   */
  @ApiResponse({
    description: 'List of buyers',
    status: 200,
    type: FindAllBuyerReturnDto
  })
  @Get()
  findAllBuyers(
    @Query() query: FindAllBuyersQueryDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<Buyer[]> {
    return this.buyersService.getAllBuyers(query, userId)
  }

  /**
   * Irá gerar um relatório em formato xlsx de acordo com
   * os filtros
   * @param query FindAllBuyerReturnDto
   * @param userId number
   */
  @Get('report')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  )
  @Header(
    'Content-disposition',
    'attachment filename=Relatorio_Relacao_Clientes.xls'
  )
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getReport(
    @Res() res: Response,
    @Query() query: FindAllBuyersQueryDto,
    @BritaniaAuth(['userId']) userId: number
  ) {
    this.buyersService.generateReport(query, userId, res)
  }

  /**
   * Irá atualizar os compradores, seus endereços e linhas x famílias
   * @param buyerId number
   * @param data UpdateBuyerDto
   * @param userId number
   */
  @Put(':buyerId')
  updateBuyer(
    @Param('buyerId') buyerId: number,
    @Body() data: UpdateBuyerDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.buyersService.update(data, buyerId, userId)
  }

  /**
   * Irá buscar o comprador
   * @param userId userId
   * @param buyerId number
   */
  @Get(':buyerId')
  findOneBuyer(
    @Param('buyerId') buyerId: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<Buyer> {
    return this.buyersService.getBuyer(userId, buyerId)
  }
}
