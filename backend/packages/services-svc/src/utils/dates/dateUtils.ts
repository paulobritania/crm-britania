/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment-timezone')

export const getUtcStartOfDay = (date?: string) =>
  moment(date).utc().startOf('day')

export const getUtcEndOfDay = (date?: string) => moment(date).utc().endOf('day')

export const getLocalStartOfDayAsUtc = (date?: string) =>
  moment(date).tz('America/Sao_Paulo').startOf('day').utc()

export const getLocalEndOfDayAsUtc = (date?: string) =>
  moment(date).tz('America/Sao_Paulo').endOf('day').utc()

export const isValidDate = (date: string): boolean => moment(date).isValid()

export const getUtcDate = (date?: string) => moment(date).utc()

export const getFormattedDate = (date: string, format?: string) => moment(date).utc().format(format)
