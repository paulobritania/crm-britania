import * as Yup from 'yup'

import flow from 'lodash/fp/flow'
import mapValues from 'lodash/mapValues'

import cep from '@britania-crm/forms/validators/cep.validator'
import cpfCnpj from '@britania-crm/forms/validators/cpfCnpj.validator'
import date from '@britania-crm/forms/validators/date.validator'
import email from '@britania-crm/forms/validators/email.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import minLength from '@britania-crm/forms/validators/minLength.validator'
import phone from '@britania-crm/forms/validators/phone.validator'
import required from '@britania-crm/forms/validators/required.validator'
import stateRegistration from '@britania-crm/forms/validators/stateRegistration.validator'
import url from '@britania-crm/forms/validators/url.validator'

import { INITIAL_VALUES as CFOP_INITIAL_VALUES } from './customerPreRegistration.cfops/customerPreRegistration.cfop.schema'
import { INITIAL_VALUES as CFOP_AGSC_INITIAL_VALUES } from './customerPreRegistration.cfops/customerPreRegistration.cfopAgsc.schema'
import { INITIAL_VALUES as CFOP_AGSP_INITIAL_VALUES } from './customerPreRegistration.cfops/customerPreRegistration.cfopAgsp.schema'
import { INITIAL_VALUES as CFOP_MANAUS_INITIAL_VALUES } from './customerPreRegistration.cfops/customerPreRegistration.cfopManaus.schema'
import { INITIAL_VALUES as CFOP_ST_INITIAL_VALUES } from './customerPreRegistration.cfops/customerPreRegistration.cfopSt.schema'
import {
  documentsSchema,
  INITIAL_VALUES_DOCUMENTS
} from './documents.schema'

const MAIN_DATA_INITIAL_VALUES = {
  responsibleCode: {},
  responsibleName: {},
  companyName: '',
  cnpj: '',
  stateRegistration: '',
  suframa: '',
  commercialPhone: '',
  billingPhone: '',
  cellphone: '',
  shoppingPhone: '',
  billingEmail: '',
  invoiceShippingEmail: '',
  businessEmail: '',
  site: '',
  publicPlace: '',
  complement: '',
  number: '',
  district: '',
  city: '',
  country: 'Brasil',
  state: '',
  zipCode: '',
  parentCompanyName: {},
  parentCompanyCnpj: ''
}

const ADDITIONAL_INFORMATION_INITIAL_VALUES = {
  initialContact: '',
  numbersOfEmployes: '',
  suggestedLimit: '',
  observation: '',
  shareCapital: '',
  revenues: [],
  commercialReferences: [],
  participationsCompany: [],
  bankReferences: [],
  counter: {
    counter: '',
    counterPhone: '',
    counterCrc: '',
    shareCapital: '',
    description: '',
    localization: '',
    values: []
  }
}

const FISCAL_INFORMATION_INITIAL_VALUES = {
  specialTaxSubstitutionRegime: false,
  clientFromMatoGrosso: false,
  taxRegime: ''
}

const REGISTRATION_INFORMATION_INITIAL_VALUES = {
  representativeCode: '',
  representativeName: ''
}

const FINANCIAL_INITIAL_VALUES = {
  issueBankSlip: '',
  gerenatesDebitNotice: '',
  calculatesFine: '',
  receives_nfe: '',
  simpleClient: '',
  receivesSciInformation: '',
  standardIncome: '',
  carrier: '',
  bankInstruction: ''
}

const CADASTRAL_CHECK_INITIAL_VALUES = {
  cadastralCheck: false,
  newClient: false,
  riskClass: ''
}

const PARAMETRIZATION_INITIAL_VALUES = {
  clientGroupCode: '',
  shortName: '',
  parentCompanyCode: '',
  parentCompany: '',
  historic: '',
  intermediary: false
}

const PRICE_LIST_INITIAL_VALUES = {
  establishment128CdEsCode: {},
  establishment22Code: {},
  establishment15Code: {},
  establishment31ManausCode: {},
  establishment31AgScCode: {},
  establishment128CdSpCode: {},
  establishment305CdPe: {}
}

const FISCAL_PARAMETRIZATION_INITIAL_VALUES = {
  doNotRetainIcms: false,
  icmsSubstitute: false,
  icmsTaxpayer: false,
  optingSuspensionsIpi: false,
  buysPhilco: false,
  withholdTax: false,
  retentionAgent: false,
  fullNonAcumulative: false,
  expirationDate: ''
}

const FISCAL_PARAMETRIZATION_CFOP_INITIAL_VALUES = {
  cfop: CFOP_INITIAL_VALUES,
  agsc: CFOP_AGSC_INITIAL_VALUES,
  agsp: CFOP_AGSP_INITIAL_VALUES,
  manaus: CFOP_MANAUS_INITIAL_VALUES,
  st: CFOP_ST_INITIAL_VALUES
}

export const INITIAL_VALUES = {
  ...MAIN_DATA_INITIAL_VALUES,
  financial: FINANCIAL_INITIAL_VALUES,
  cadastralCheck: CADASTRAL_CHECK_INITIAL_VALUES,
  parametrization: PARAMETRIZATION_INITIAL_VALUES,
  priceList: PRICE_LIST_INITIAL_VALUES,
  fiscalParametrization: FISCAL_PARAMETRIZATION_INITIAL_VALUES,
  documents: INITIAL_VALUES_DOCUMENTS,

  additionalInformation: ADDITIONAL_INFORMATION_INITIAL_VALUES,
  fiscalInformation: FISCAL_INFORMATION_INITIAL_VALUES,
  registrationInformation: REGISTRATION_INFORMATION_INITIAL_VALUES,
  fiscalParametrizationCfop: FISCAL_PARAMETRIZATION_CFOP_INITIAL_VALUES
}

export default ({ t, data }) => {
  const mainData = {
    responsibleCode: Yup.object(),
    responsibleName: Yup.object(),
    companyName: flow(
      maxLength({
        t,
        field: t('company name'),
        type: t('characters', { howMany: 1 }),
        length: 70
      }),
      required({ t }))(Yup.string()),
    cnpj: flow(
      cpfCnpj({ t, mode: 'cnpj' }),
      required({ t })
    )(Yup.string()),
    stateRegistration: stateRegistration({ t })(Yup.string()),
    suframa: maxLength({
      t,
      field: t('suframa'),
      type: t('digits'),
      length: 14
    })(Yup.string()),
    commercialPhone: flow(
      phone({ t }),
      required({ t })
    )(Yup.string()),
    billingPhone: phone({ t })(Yup.string()),
    cellphone: phone({ t })(Yup.string()),
    shoppingPhone: phone({ t })(Yup.string()),
    billingEmail: flow(
      maxLength({
        t,
        field: t('billing email'),
        type: t('characters', { howMany: 1 }),
        length: 70
      }),
      email({ t }),
      required({ t })
    )(Yup.string()),
    invoiceShippingEmail: flow(
      maxLength({
        t,
        field: t('invoice shipping email'),
        type: t('characters', { howMany: 1 }),
        length: 70
      }),
      email({ t }),
      required({ t })
    )(Yup.string()),
    businessEmail: flow(
      maxLength({
        t,
        field: t('business email'),
        type: t('characters', { howMany: 1 }),
        length: 70
      }),
      email({ t })
    )(Yup.string()),
    country: flow(
      maxLength({
        t,
        field: t('country'),
        type: t('characters', { howMany: 1 }),
        length: 40
      }),
      required({ t })
    )(Yup.string()),
    site: flow(
      maxLength({
        t,
        field: t('site'),
        type: t('characters', { howMany: 1 }),
        length: 40
      }),
      url({ t })
    )(Yup.string()),
    zipCode: required({ t })(cep({ t })(Yup.string())),
    state: Yup.string(),
    city: flow(
      maxLength({
        t,
        field: t('city', { howMany: 1 }),
        type: t('characters', { howMany: 1 }),
        length: 40
      }),
      required({ t })
    )(Yup.string()),
    district: flow(
      maxLength({
        t,
        field: t('district', { howMany: 1 }),
        type: t('characters', { howMany: 1 }),
        length: 40
      }),
      required({ t })
    )(Yup.string()),
    publicPlace: flow(
      maxLength({
        t,
        field: t('public place'),
        type: t('characters', { howMany: 1 }),
        length: 70
      }),
      required({ t })
    )(Yup.string()),
    number: required({ t })(Yup.string()),
    complement: maxLength({
      t,
      field: t('complement', { howMany: 1 }),
      type: t('characters', { howMany: 1 }),
      length: 70
    })(Yup.string()),
    parentCompanyName: (Yup.object()),
    parentCompanyCnpj: cpfCnpj({ t, mode: 'cnpj' })(Yup.string())
  }

  const additionalInformation = Yup.object().shape({
    initialContact: required({ t })(Yup.string()),
    numbersOfEmployes: flow(
      maxLength({
        t,
        field: t('number of employers'),
        type: t('digits'),
        length: 6
      }),
      required({ t }))(Yup.string()),
    suggestedLimit: required({ t })(Yup.string()),
    shareCapital: required({ t })(Yup.string()),
    observation: Yup.string(),
    revenues: Yup.array(),
    counter: Yup.object().shape({
      counter: Yup.string(),
      counterPhone: phone({ t })(Yup.string()),
      counterCrc: Yup.string(),
      values: Yup.array()
    }),
    commercialReferences: minLength({
      t,
      length: 3,
      type: t('item', { howMany: 2 }),
      field: t('commercial reference', { howMany: 2 })
    })(Yup.array()),
    bankReferences: required({ t, isNotText: true })(Yup.array()),
    participationsCompany: Yup.array()
  })

  const fiscalInformation = Yup.object().shape({
    specialTaxSubstitutionRegime: required({ t, isNotText: true })(Yup.bool()),
    clientFromMatoGrosso: required({ t, isNotText: true })(Yup.bool()),
    taxRegime: required({ t })(Yup.string())
  })

  const financial = Yup.object().shape({
    issueBankSlip: Yup.string(), // Feito
    gerenatesDebitNotice: Yup.string(), // Feito
    calculatesFine: Yup.string(), // Feito
    receives_nfe: Yup.string(), // Feito
    simpleClient: Yup.string(), // Feito
    receivesSciInformation: Yup.string(), // Feito
    standardIncome: flow(
      maxLength({
        t,
        field: t('standard income'),
        type: t('characters', { howMany: 1 }),
        length: 5
      }),
      required({ t })
    )(Yup.string()),
    carrier: flow(
      maxLength({
        t,
        field: t('carrier'),
        type: t('characters', { howMany: 1 }),
        length: 8
      }),
      required({ t })
    )(Yup.string()),
    bankInstruction: flow(
      maxLength({
        t,
        field: t('bank instruction'),
        type: t('characters', { howMany: 1 }),
        length: 5
      }),
      required({ t })
    )(Yup.string())
  })

  const cadastralCheck = Yup.object().shape({
    cadastralCheck: required({ t })(Yup.string()),
    newClient: required({ t })(Yup.string()),
    riskClass: required({ t })(Yup.string()) // TODO: Validar
  })

  const parametrization = Yup.object().shape({
    clientGroupCode: Yup.string(),
    shortName: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters', { howMany: 1 }),
        field: t('short name')
      }),
      required({ t })
    )(Yup.string()),
    parentCompanyCode: Yup.string(), // TODO: Necessário validar com a Dani o funcionamento
    parentCompany: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters', { howMany: 1 }),
        field: t('matrix')
      }),
      required({ t })
    )(Yup.string()),
    historic: required({ t })(Yup.string()),
    intermediary: Yup.string()
  })

  const priceList = Yup.object().shape({
    establishment128CdEsCode: Yup.object(),
    establishment22Code: Yup.object(),
    establishment15Code: Yup.object(),
    establishment31ManausCode: Yup.object(),
    establishment31AgScCode: Yup.object(),
    establishment31AgSpCode: Yup.object(),
    establishment305CdPe: Yup.object()
  })

  const fiscalParametrization = Yup.object().shape({
    doNotRetainIcms: Yup.bool(),
    icmsSubstitute: Yup.bool(),
    icmsTaxpayer: Yup.bool(),
    optingSuspensionsIpi: Yup.bool(),
    buysPhilco: Yup.bool(),
    withholdTax: Yup.bool(),
    retentionAgent: Yup.bool(),
    fullNonAcumulative: Yup.string(),
    expirationDate: (() => {
      if (data?.fiscalParametrization?.fullNonAcumulative) {
        return flow(
          date({ t }),
          required({ t })
        )(Yup.string())
      }
      return date({ t })(Yup.string())
    })()
  })

  const fiscalParametrizationCfop = Yup.object().shape(
    mapValues(
      FISCAL_PARAMETRIZATION_CFOP_INITIAL_VALUES,
      () => Yup.object()
    )
  )

  const documents = documentsSchema({ t })

  return Yup.object().shape({
    ...mainData,
    additionalInformation,
    fiscalInformation,
    financial,
    cadastralCheck,
    parametrization,
    priceList,
    fiscalParametrization,
    fiscalParametrizationCfop,
    documents
  })
}
