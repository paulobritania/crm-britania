import { AxiosResponse, AxiosError } from 'axios'

export const OkResponse = <T>(data: T): AxiosResponse<T> => ({
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  data
})

const AxiosErrorResponse = (response: AxiosResponse): AxiosError => ({
  config: null,
  isAxiosError: true,
  toJSON: () => ({}),
  name: '',
  message: '',
  response
})

export const BadRequestResponse = (): AxiosError =>
  AxiosErrorResponse({
    status: 400,
    statusText: 'BAD REQUEST',
    headers: {},
    config: {},
    data: {}
  })

export const UnauthorizedResponse = (): AxiosError =>
  AxiosErrorResponse({
    status: 401,
    statusText: 'UNAUTHORIZED',
    headers: {},
    config: {},
    data: {}
  })

export const InternalServerErrorResponse = (): AxiosError =>
  AxiosErrorResponse({
    status: 500,
    statusText: 'INTERNAL SERVER ERROR',
    headers: {},
    config: {},
    data: {}
})
