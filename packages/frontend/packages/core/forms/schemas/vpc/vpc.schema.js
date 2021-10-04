import * as Yup from 'yup'

import flow from 'lodash/fp/flow'
import reduce from 'lodash/reduce'

import cpfCnpj from '@britania-crm/forms/validators/cpfCnpj.validator'
import dateRange from '@britania-crm/forms/validators/dateRange.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  cnpj: '',
  parentCompany: {},
  parentCompanyCode: {},
  companyName: '',
  foundsType: '',
  paymentType: '',
  bank: {},
  bankAgency: '',
  bankAccount: '',
  bankCnpj: '',
  requestNumber: '',
  value: '',
  negotiationNumber: '',
  campaignReason: '',
  period: { from: '', to: '' },
  directorshipCode: '',
  directorshipDescription: '',
  approverCode: {},
  status: true,
  linesFamilies: [],
  nds: [],
  products: [],
  requests: [],
  attachments: [],
  situation: '',
  responsible: ''
}

export default ({ t }) => {
  const validateNdsValue = ({ nds, value }) => {
    const totalValue = Number(value || 0)
    const sum = reduce(nds, (acc, nd) => acc + (nd.active ? Number(nd.value) : 0), 0)
    return sum <= totalValue
  }

  return Yup.object().shape({
    cnpj: cpfCnpj({ t })(Yup.string()),
    parentCompany: Yup.object(),
    parentCompanyCode: required({ t, isNotText: true })(Yup.object()),
    companyName: maxLength({
      t,
      length: 70,
      type: t('characters', { howMany: 1 }),
      field: t('company name')
    })(Yup.string()),
    foundsType: required({ t })(Yup.string()),
    paymentType: required({ t })(Yup.string()),
    requestNumber: Yup.string(),
    bank: Yup.object(),
    bankAgency: maxLength({
      t,
      length: 4,
      type: t('characters', { howMany: 1 }),
      field: t('agency', { howMany: 1 })
    })(Yup.string()),
    bankAccount: Yup.string(),
    bankCnpj: cpfCnpj({ t, mode: 'cnpj' })(Yup.string()),
    value: flow(
      (YupInstance) => YupInstance.test(
        'nds',
        t('nds may be less then total value'),
        (value, { parent }) => validateNdsValue({ nds: parent.nds, value })
      ),
      required({ t })
    )(Yup.string()),
    negotiationNumber: Yup.string(),
    campaignReason: flow(
      maxLength({
        t,
        length: 500,
        type: t('characters', { howMany: 1 })
      }),
      required({ t })
    )(Yup.string()),
    period: flow(
      dateRange({ t }),
      required({
        t,
        isNotText: true,
        isDateRange: true
      })
    )(Yup.object()),
    directorshipCode: required({ t })(Yup.string()),
    directorshipDescription: required({ t })(Yup.string()),
    approverCode: required({ t, isNotText: true })(Yup.object()),
    status: Yup.boolean(),
    linesFamilies: required({ t, isNotText: true })(Yup.array()),
    nds: Yup.array().test(
      'nds',
      t('nds may be less then total value'),
      (nds, { parent }) => validateNdsValue({ nds, value: parent.value })
    ),
    products: Yup.array(),
    requests: Yup.array(),
    attachments: Yup.array(),
    situation: Yup.string(),
    responsible: Yup.string()
  })
}
