export interface JwtPayload {
  userId: string | number

  tokenBritania: string

  profiles: string

  accesses: string

  [key: string]: any
}
