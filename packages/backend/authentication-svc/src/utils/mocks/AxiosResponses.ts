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

export const UnauthorizedResponse = (): AxiosError =>
  AxiosErrorResponse({
    status: 401,
    statusText: 'UNAUTHORIZED',
    headers: {},
    config: {},
    data: {}
  })

export const InternalErrorResponse = (): AxiosError =>
  AxiosErrorResponse({
    status: 500,
    statusText: 'INTERNAL ERROR',
    headers: {},
    config: {},
    data: {}
  })
