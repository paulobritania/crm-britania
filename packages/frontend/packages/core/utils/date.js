
import moment from 'moment/moment'

const tzHours = 3

export const dateBackFormat = 'YYYY-MM-DD'
export const dateTimeBackFormat = 'YYYY-MM-DD[T]HH:mm:ss.sss[Z]'
export const timeBackFormat = 'HH:mm:ss.sss[Z]'
export const monthYearBackFormat = 'YYYY-MM'
export const monthDayBackFormat = 'MM-DD'

export const monthDayFriendlyFormat = 'DD/MM'
export const dateFriendlyFormat = 'DD/MM/YYYY'
export const dateTimeFriendlyFormat = 'DD/MM/YYYY HH:mm:ss'

export const leapYear = '2020'

export const formatBackDateToFriendlyFormat = (date, tz = tzHours) => moment(date, dateTimeBackFormat).subtract(tz, 'hours').format(dateFriendlyFormat)
export const formatBackDateToIsoFormat = (date, tz = tzHours) => moment(date, dateBackFormat).subtract(tz, 'hours').toISOString()
export const formatBackDateTimeToFriendlyFormat = (date, tz = tzHours) => moment(date, dateTimeBackFormat).subtract(tz, 'hours').format(dateTimeFriendlyFormat)
export const formatBackDateTimeToFriendlyDateFormat = (date, tz = tzHours) => moment(date, dateTimeBackFormat).subtract(tz, 'hours').format(dateFriendlyFormat)

export const formatBackDateTimeToBackDateFormat = (date, tz = tzHours) => moment(date, dateTimeBackFormat).subtract(tz, 'hours').format(dateBackFormat)

export const formatFriendlyDateToBackFormat = (date) => moment(date, dateBackFormat).format(dateTimeBackFormat)
export const formatFriendlyDateFromBackFormat = (date) => moment(date, dateBackFormat).format(dateFriendlyFormat)
