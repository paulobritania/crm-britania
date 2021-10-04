import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import cep from '@britania-crm/forms/validators/cep.validator'
import cpfCnpj from '@britania-crm/forms/validators/cpfCnpj.validator'
import dayMonth from '@britania-crm/forms/validators/dayMonth.validator'
import email from '@britania-crm/forms/validators/email.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import number from '@britania-crm/forms/validators/number.validator'
import phone from '@britania-crm/forms/validators/phone.validator'
import required from '@britania-crm/forms/validators/required.validator'

const addressInitialValues = {
  street: '',
  number: '',
  district: '',
  city: '',
  uf: '',
  cep: '',
  complement: ''
}

export const INITIAL_VALUES = {
  cpf: '',
  name: '',
  category: '',
  voltage: '110',
  role: '',
  birthday: '',
  email: '',
  telephone: '',
  linesFamilies: [],
  active: false,
  parentCompanyAddress: addressInitialValues,
  buyerAddress: addressInitialValues,
  clientTotvsDescription: {},
  clientTotvsCode: {},
  responsible: {},
  regionalManager: {}
}

export default ({ t }) => {
  const addressSchema = () => Yup.object().shape({
    street: maxLength({
      t,
      length: 70,
      type: t('characters', { howMany: 1 }),
      field: t('public place', { howMany: 1 })
    })(Yup.string()),
    number: flow(
      maxLength({
        t,
        length: 10,
        type: t('digits'),
        field: t('number', { howMany: 1 })
      }),
      number({ t }))((Yup.string())),
    district: maxLength({
      t,
      length: 40,
      type: t('characters', { howMany: 1 }),
      field: t('district', { howMany: 1 })
    })(Yup.string()),
    cep: cep({ t })(Yup.string()),
    city: maxLength({
      t,
      length: 40,
      type: t('characters', { howMany: 1 }),
      field: t('city', { howMany: 1 })
    })(Yup.string()),
    uf: Yup.string(),
    complement: maxLength({
      t,
      length: 70,
      type: t('characters', { howMany: 1 }),
      field: t('city', { howMany: 1 })
    })(Yup.string())
  })

  return Yup.object().shape({
    active: Yup.bool(),
    cpf: flow(
      cpfCnpj({ t }),
      required({ t })
    )(Yup.string()),
    name: required({ t })(Yup.string()),
    category: required({ t })(Yup.string()),
    linesFamilies: required({ t, isNotText: true })(Yup.array()),
    email: flow(
      email({ t }),
      required({ t })
    )(Yup.string()),
    telephone: flow(
      phone({ t }),
      required({ t })
    )(Yup.string()),
    voltage: Yup.string(),
    birthday: dayMonth({ t })(Yup.string()),
    role: Yup.string(),
    parentCompanyAddress: addressSchema(),
    buyerAddress: addressSchema(),
    clientTotvsCode: required({ t, isNotText: true })(Yup.object()),
    clientTotvsDescription: required({ t, isNotText: true })(Yup.object()),
    responsible: Yup.object(),
    regionalManager: Yup.object()
  })
}
