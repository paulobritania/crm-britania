
import React from 'react'

import endsWith from 'lodash/endsWith'
import mapValues from 'lodash/mapValues'
import reduce from 'lodash/reduce'

import { INITIAL_VALUES as CFOP_AGSC_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfopAgsc.schema'
import { INITIAL_VALUES as CFOP_AGSP_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfopAgsp.schema'
import { INITIAL_VALUES as CFOP_MANAUS_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfopManaus.schema'
import { INITIAL_VALUES as CFOP_ST_INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.cfops/customerPreRegistration.cfopSt.schema'
import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'
import CheckboxStatus from '@britania-crm/web-components/CheckboxStatus'
import RankingBadge from '@britania-crm/web-components/RankingBadge'

export const getConfigClientsColumns = (t) => [
  {
    title: t('matrix'),
    field: 'parentCompany',
    cellStyle: {
      color: colors.secondary.main,
      fontWeight: fonts.fontWeight.regular
    }
  },
  {
    title: t('matrix code', { abbreviation: true }),
    field: 'parentCompanyCode'
  },
  {
    title: t('logistical information', { abbreviation: true }),
    field: 'logisticInformation'
  },
  {
    title: t('credit status', { abbreviation: true }),
    field: 'creditSituation'
  },
  {
    title: t('letter of regime', { abbreviation: true }),
    field: 'regimeLetter'
  },
  {
    title: t('days without billing', { abbreviation: true }),
    field: 'daysWithoutBilling',
    width: 110,
    cellStyle: { minWidth: 110 },
    render: (row) => row.daysWithoutBilling !== null ? `${ row.daysWithoutBilling } ${ t('day', { howMany: row.daysWithoutBilling || 0 }) }` : '-'
  },
  {
    sorting: false,
    title: t('ranking'),
    field: 'ranking',
    render (row) {
      return (<RankingBadge type={ row?.ranking?.alias } />)
    }
  },
  {
    sorting: true,
    title: t('status'),
    field: 'active',
    render (row) {
      let status, color

      if (row.status === 'ACTIVE') {
        status = t('active')
      } else if (row.status === 'INACTIVE') {
        status = t('inactive')
        color = colors.error.main
      } else {
        status = t('registration in process of change')
        color = colors.warning.main
      }

      return (
        <CheckboxStatus
          detached
          readOnly
          value={ row.status !== 'INACTIVE' }
          style={ { color: colors.black2 } }
          activeStatus={ status }
          activeColor={ color }
          notFistLabel
        />
      )
    }
  }
]

export const getConfigsCompanysBranchColumns = (t) => [
  {
    title: t('companys branch'),
    field: 'branchName',
    cellStyle: {
      cellStyle: {
        color: colors.secondary.main,
        fontWeight: fonts.fontWeight.regular
      }
    }
  },
  {
    title: t('companys branch code'),
    field: 'branchCode'
  },
  {
    title: 'UF',
    field: 'state'
  },
  {
    title: t('city', { howMany: 1 }),
    field: 'city'
  },
  {
    title: t('cd code', { abbreviation: true }),
    field: 'cdCode'
  },
  {
    title: t('situation'),
    field: 'creditSituation'
  },
  {
    title: t('status'),
    field: 'active',
    render (row) {
      let status, color

      if (row.status === 'ACTIVE') {
        status = t('active')
      } else if (row.status === 'INACTIVE') {
        status = t('inactive')
        color = colors.error.main
      } else {
        status = t('registration in process of change')
        color = colors.warning.main
      }

      return (
        <CheckboxStatus
          detached
          readOnly
          value={ row.status !== 'INACTIVE' }
          style={ { color: colors.black2 } }
          activeStatus={ status }
          activeColor={ color }
        />
      )
    }
  }
]

export const getPayloadFiscalParametrizationCfop = ({ fiscalParametrizationCfop } = {}) => reduce(
  fiscalParametrizationCfop,
  (acc, cfopItems) => ({
    ...acc,
    ...mapValues(cfopItems, (fieldValue, fieldName) => {
      if (endsWith(fieldName, 'Code')) {
        return fieldValue?.code || null
      }
      return fieldValue?.description || null
    })
  }),
  {}
)

const transformCodeNameToDescriptionName = (fieldName) => `${ fieldName.substr(0, fieldName.length - 4) }Description`

export const getFormFiscalParametrizationCfop = ({ cfop } = {}) => {
  const result = reduce(
    cfop,
    (acc, itemValue, fieldName) => {
      if (endsWith(fieldName, 'Code') && itemValue) {
        const descriptionFieldName = transformCodeNameToDescriptionName(fieldName)

        const mergeCfops = (path) => ({
          ...acc,
          [path]: {
            ...(acc?.[path] || {}),
            [fieldName]: { code: itemValue || '' },
            [descriptionFieldName]: { description: cfop[descriptionFieldName] || '' }
          }
        })

        if (CFOP_AGSC_INITIAL_VALUES[fieldName] !== undefined) {
          return mergeCfops('agSc')
        }
        if (CFOP_AGSP_INITIAL_VALUES[fieldName] !== undefined) {
          return mergeCfops('agSp')
        }
        if (CFOP_ST_INITIAL_VALUES[fieldName] !== undefined) {
          return mergeCfops('st')
        }
        if (CFOP_MANAUS_INITIAL_VALUES[fieldName] !== undefined) {
          return mergeCfops('manaus')
        }

        return mergeCfops('cfop')
      }
      return acc
    },
    {}
  )

  console.log('result', result)

  return result
}
