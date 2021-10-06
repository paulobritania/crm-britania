import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import cep from '@britania-crm/forms/validators/cep.validator'
import cpfCnpj from '@britania-crm/forms/validators/cpfCnpj.validator'
import email from '@britania-crm/forms/validators/email.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import number from '@britania-crm/forms/validators/number.validator'
import phone from '@britania-crm/forms/validators/phone.validator'
import required from '@britania-crm/forms/validators/required.validator'

const addressInitialValues = {
  zipCode: '',
  publicPlace: '',
  number: '',
  district: '',
  complement: '',
  city: '',
  state: '',
  country: 'Brasil',
  phone: '',
  email: ''
}

export const INITIAL_VALUES = {
  mainData: {
    parentCompanyCode: '',
    parentCompanyName: '',
    cnpj: '',
    companyName: '',
    branch: '',
    commercialPhone: '',
    cellPhone: '',
    logisticsInformation: '',
    creditAtatus: '',
    branches: '',
    regimeLetter: '',
    creditSituation: '',
    daysWithoutBilling: '',
    customerRanking: '',
    status: true
  },
  deliveryAddress: addressInitialValues,
  billingAddress: addressInitialValues
}

export default ({ t }) => {
  const addressSchema = () => Yup.object().shape({
    zipCode: cep({ t })(Yup.string()),
    publicPlace: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters')
      }),
      required({ t })
    )(Yup.string()),
    number: flow(
      number({ t }),
      required({ t }),
      maxLength({
        t,
        length: 70,
        type: t('characters')
      })
    )(Yup.string()),
    district: flow(
      maxLength({
        t,
        length: 40,
        type: t('characters')
      }),
      required({ t })
    )(Yup.string()),
    complement: flow(
      maxLength({
        t,
        length: 70,
        type: t('characters')
      })
    )(Yup.string()),
    city: flow(
      maxLength({
        t,
        length: 40,
        type: t('characters')
      }),
      required({ t })
    )(Yup.string()),
    state: required({ t })(Yup.string()),
    country: flow(
      maxLength({
        t,
        length: 40,
        type: t('characters')
      }),
      required({ t })
    )(Yup.string()),
    phone: phone({ t })(Yup.string()),
    email: flow(
      email({ t }),
      required({ t })
    )(Yup.string())
  })

  return Yup.object().shape({
    mainData: Yup.object().shape({
      parentCompanyCode: Yup.string(),
      parentCompanyName: Yup.string(),
      cnpj: cpfCnpj({ t })(Yup.string()),
      socialReason: Yup.string(),
      branch: Yup.string(),
      commercialPhone: flow(
        phone({ t }),
        required({ t })
      )(Yup.string()),
      cellPhone: phone({ t })(Yup.string()),
      logisticsInformation: flow(
        maxLength({
          t,
          length: 40,
          type: t('characters')
        })
      )(Yup.string()),
      branches: Yup.string(),
      regimeLetter: flow(
        maxLength({
          t,
          length: 40,
          type: t('characters')
        })
      )(Yup.string()),
      creditSituation: flow(
        maxLength({
          t,
          length: 40,
          type: t('characters')
        })
      )(Yup.string()),
      daysWithoutBilling: (Yup.lazy((value) => typeof value === 'number' ? Yup.number() : Yup.string())),
      customerRanking: Yup.string(),
      status: Yup.bool()
    }),
    deliveryAddress: addressSchema(),
    billingAddress: addressSchema()
  })
}
