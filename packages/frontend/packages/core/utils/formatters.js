import trimMaskMeta from '@meta-awesome/functions/src/trimMask'
import currency from 'currency.js'
import format from 'formatar-valores'

import first from 'lodash/first'
import flow from 'lodash/fp/flow'
import isNaN from 'lodash/isNaN'
import isNumber from 'lodash/isNumber'
import last from 'lodash/last'
import lowerCase from 'lodash/lowerCase'
import reduce from 'lodash/reduce'
import split from 'lodash/split'
import startCase from 'lodash/startCase'
import trim from 'lodash/trim'
import upperCase from 'lodash/upperCase'

export const formatCpfCnpj = (num) => format.cpfCnpj(num)

export const formatCep = (num) => format.cep(num)

export const formatPhone = (num = '') => {
  const ddd = num.substr(0, 2)
  const phone = num.slice(2, num.length)
  return `(${ ddd }) ${ format.telefone(phone) }`
}

export const formatNumber = (num, locale = 'pt-BR') => {
  try {
    if (num === undefined) {
      return 0
    }

    let number = num
    if (!isNumber(number)) {
      number = Number(num)
    }
    return number.toLocaleString(locale)
  } catch (e) {
    console.error('formatNumber error:', e)
    return num
  }
}

export const formatMoney = (amount) => currency(
  isNumber(amount) ? amount : Number(amount),
  {
    symbol: 'R$ ',
    separator: '.',
    decimal: ','
  }
).format()

export const formatFloat = (
  amount,
  decimalCount = 2,
  decimal = ',',
  thousands = '.'
) => {
  try {
    const number = isNaN(Math.abs(decimalCount)) ? 2 : decimalCount
    const negativeSign = amount < 0 ? '-' : ''
    const amountToParse = Math.abs(Number(amount) || 0)

    const i = parseInt(amountToParse.toFixed(number), 10).toString()
    const j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${ thousands }`) +
      (number
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    )
  } catch (e) {
    console.error(`formatFloat error: ${ e }`)
    return false
  }
}

export const trimMask = (str = '') => {
  const extraChars = ['\u2000', '&', '#', ',', ';', '+', '(', ')', '$', '~', '%', '.', '"', ':', '*', '?', '<', '>', '{', '}']
  if (str) {
    return reduce(
      extraChars,
      (strTrim, char) => strTrim.split(char).join(''),
      trim(trimMaskMeta(str))
    )
  }
  return str
}

export const formatUsernameToAvatar = (username = '') => {
  const usernameArr = split(username, '.')
  const firstName = first(usernameArr)
  const lastName = last(usernameArr)

  return upperCase(`${ first(firstName) }${ first(lastName) }`)
}

export const lowerAndStartCase = (item) => flow(
  lowerCase,
  startCase
)(item)
