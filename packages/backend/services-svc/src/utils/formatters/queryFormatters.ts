import { PaginationQueryDto } from '../dto/paginationQuery.dto'

export const formatPaginationQuery = (query: PaginationQueryDto): PaginationQueryDto => {
  return {
    ...(query.limit && { limit: Number(query.limit) }),
    ...(query.offset && { offset: Number(query.offset) })
  }
}
