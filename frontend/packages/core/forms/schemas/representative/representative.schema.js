import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import cep from '@britania-crm/forms/validators/cep.validator'
import cpfCnpj from '@britania-crm/forms/validators/cpfCnpj.validator'
import date from '@britania-crm/forms/validators/date.validator'
import email from '@britania-crm/forms/validators/email.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import number from '@britania-crm/forms/validators/number.validator'
import phone from '@britania-crm/forms/validators/phone.validator'
import required from '@britania-crm/forms/validators/required.validator'
import stateRegistration from '@britania-crm/forms/validators/stateRegistration.validator'
import url from '@britania-crm/forms/validators/url.validator'

export const INITIAL_VALUES = {
  companyName: '',
  cnpj: '',
  contactName: '',
  stateRegistration: '',
  suframa: '',
  commercialPhone: '',
  billingPhone: '',
  cellphone: '',
  email: '',
  site: '',

  // Endereço
  address: {
    cep: '',
    street: '',
    number: '',
    district: '',
    complement: '',
    city: '',
    state: '',
    country: 'Brasil'
  },

  // dados bancários
  bankData: {
    code: {
      code: '',
      description: ''
    },
    agency: '',
    account: ''
  },

  // Documentação
  documents: [],

  // financeiro
  financial: {
    clientGroup: {},
    shortName: '',
    matrix: '',
    historic: '',
    carrier: '',
    receivesNfe: false,
    bankInstructions: '',
    standardIncomeInstructions: '',
    issueBankSlip: false,
    generatesDebitNotice: false,
    calculatesFine: false,
    receivesSciInformation: false,
    simpleClient: false,
    icmsTaxpayer: false,
    buysPhilco: false,
    fullNonCumulative: false,
    expirationDate: ''
  },

  // Manutenção
  maintenance: {
    representativeType: '',
    personType: '',
    country: 'Brasil',
    representativeGroup: {},
    paymentCalendar: '',
    formula: '',
    intermediator: false,
    generationAdCarrier: '',
    commissionPercentage: '',
    commissionEmissionPercentage: '',
    minimumCommissionPercentage: '',
    maximumCommissionPercentage: '',
    manualCommission: ''
  },

  // Percentual de comissão
  commissionPercentage: []

}

export default ({ t }) => Yup.object().shape({
  companyName: flow(
    maxLength({
      t,
      length: 70,
      type: t('characters'),
      field: t('company name')
    }),
    required({ t })
  )(Yup.string()),
  cnpj: flow(
    cpfCnpj({ t, mode: 'cnpj' }),
    required({ t })
  )(Yup.string()),
  contactName: flow(
    maxLength({
      t,
      length: 30,
      type: t('characters'),
      field: t('name representative')
    }),
    required({ t })
  )(Yup.string()),
  stateRegistration: stateRegistration({ t })(Yup.string()),
  suframa: maxLength({
    t,
    length: 14,
    type: t('digits'),
    field: t('suframa')
  })(Yup.string()),
  commercialPhone: flow(
    phone({ t }),
    required({ t })
  )(Yup.string()),
  billingPhone: phone({ t })(Yup.string()),
  cellphone: flow(
    phone({ t }),
    required({ t })
  )(Yup.string()),
  email: flow(
    maxLength({
      t,
      length: 40,
      type: t('characters'),
      field: t('email')
    }),
    email({ t }),
    required({ t })
  )(Yup.string()),
  site: flow(
    url({ t }),
    maxLength({
      t,
      length: 40,
      type: t('characters'),
      field: 'site'
    })
  )(Yup.string()),

  // Endereço
  address: Yup.object().shape({
    cep: flow(
      cep({ t }),
      required({ t })
    )(Yup.string()),
    street: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters'),
        field: t('public place')
      }),
      required({ t })
    )(Yup.string()),
    number: flow(
      maxLength({
        t,
        length: 10,
        type: t('digits'),
        field: t('number', { howMany: 2 })
      }),
      number({ t }),
      required({ t })
    )(Yup.string()),
    district: flow(
      maxLength({
        t,
        length: 40,
        type: t('characters'),
        field: t('district', { howMany: 1 })
      }),
      required({ t })
    )(Yup.string()),
    complement: maxLength({
      t,
      length: 70,
      type: t('characters'),
      field: t('complement', { howMany: 1 })
    })(Yup.string()),
    city: flow(
      maxLength({
        t,
        length: 40,
        type: t('characters'),
        field: t('city', { howMany: 1 })
      }),
      required({ t })
    )(Yup.string()),
    state: required({ t })(Yup.string()),
    country: flow(
      maxLength({
        t,
        length: 40,
        type: t('characters'),
        field: t('country')
      }),
      required({ t })
    )(Yup.string())
  }),

  // dados bancários
  bankData: Yup.object().shape({
    code: Yup.object(),
    agency: maxLength({
      t,
      length: 7,
      type: t('digits'),
      field: t('agency', { howMany: 1 })
    })(Yup.string()),
    account: maxLength({
      t,
      length: 20,
      type: t('digits'),
      field: t('account', { howMany: 1 })
    })(Yup.string())
  }),

  // Documentação
  documents: Yup.array(),

  // financeiro
  financial: Yup.object().shape({
    clientGroup: required({ t, isNotText: true })(Yup.object()),
    shortName: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters'),
        field: t('short name')
      }),
      required({ t })
    )(Yup.string()),
    matrix: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters'),
        field: t('matrix', { howMany: 1 })
      }),
      required({ t })
    )(Yup.string()),
    historic: required({ t })(Yup.string()),
    carrier: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters'),
        field: t('carrier')
      }),
      required({ t })
    )(Yup.string()),
    receivesNfe: Yup.bool(),
    bankInstructions: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters'),
        field: t('banking instructions')
      }),
      required({ t })
    )(Yup.string()),
    standardIncomeInstructions: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters'),
        field: t('standard recipe instructions')
      }),
      required({ t })
    )(Yup.string()),
    issueBankSlip: Yup.bool(),
    generatesDebitNotice: Yup.bool(),
    calculatesFine: Yup.bool(),
    receivesSciInformation: Yup.bool(),
    simpleClient: Yup.bool(),
    icmsTaxpayer: Yup.bool(),
    buysPhilco: Yup.bool(),
    fullNonCumulative: Yup.bool(),
    expirationDate: date({ t })(Yup.string())
  }),

  // Manutenção
  maintenance: Yup.object().shape({
    representativeType: flow(
      number({ t }),
      maxLength({
        t,
        length: 3,
        type: t('digits'),
        field: t('representative type')
      }),
      required({ t })
    )(Yup.string()),
    personType: required({ t })(Yup.string()),
    country: flow(
      maxLength({
        t,
        length: 20,
        type: t('characters'),
        field: t('country')
      }),
      required({ t })
    )(Yup.string()),
    representativeGroup: required({ t, isNotText: true })(Yup.object()),
    paymentCalendar: flow(
      maxLength({
        t,
        length: 6,
        type: t('characters'),
        field: t('payment schedule')
      }),
      required({ t })
    )(Yup.string()),
    formula: flow(
      maxLength({
        t,
        length: 12,
        type: t('characters'),
        field: t('formula')
      }),
      required({ t })
    )(Yup.string()),
    intermediator: Yup.string(),
    generationAdCarrier: flow(
      number({ t }),
      maxLength({
        t,
        length: 4,
        type: t('digits'),
        field: t('ad generation carrier')
      }),
      required({ t })
    )(Yup.string()),
    commissionPercentage: flow(
      number({ t }),
      maxLength({
        t,
        length: 3,
        type: t('digits'),
        field: t('commission')
      }),
      required({ t })
    )(Yup.string()),
    minimumCommissionPercentage: flow(
      number({ t }),
      maxLength({
        t,
        length: 3,
        type: t('digits'),
        field: t('minimum with')
      }),
      required({ t })
    )(Yup.string()),
    maximumCommissionPercentage: flow(
      number({ t }),
      maxLength({
        t,
        length: 3,
        type: t('digits'),
        field: t('maximum with')
      }),
      required({ t })
    )(Yup.string()),
    commissionEmissionPercentage: flow(
      number({ t }),
      maxLength({
        t,
        length: 3,
        type: t('digits'),
        field: t('with issuancer')
      }),
      required({ t })
    )(Yup.string()),
    manualCommission: flow(
      number({ t }),
      maxLength({
        t,
        length: 3,
        type: t('digits'),
        field: t('manualCommission')
      }),
      required({ t })
    )(Yup.string())
  }),

  // Percentual de comissão
  commissionPercentage: required({ t, isNotText: true })(Yup.array())
})
