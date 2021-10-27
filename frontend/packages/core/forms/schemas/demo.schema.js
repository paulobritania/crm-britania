import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import cep from '@britania-crm/forms/validators/cep.validator'
import email from '@britania-crm/forms/validators/email.validator'
import minLength from '@britania-crm/forms/validators/minLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  name: '',
  email: '',
  address: {
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: ''
  }
}

const demoSchema = ({ t, data }) => Yup.object().shape({
  name: required({ t })(Yup.string()),
  email: flow(
    email({ t }),
    required({ t })
  )(Yup.string()),
  address: Yup.object().shape({
    cep: flow(
      cep({ t }),
      required({ t })
    )(Yup.string()),
    state: required({ t })(Yup.string()),
    city: flow(
      minLength({
        t,
        length: 3,
        field: t('city', { howMany: 1 })
      }),
      required({ t })
    )(Yup.string()),
    neighborhood: (() => {
      let YupInstance = Yup.string()
      if (data?.address?.street) {
        YupInstance = required({ t })(YupInstance)
      }
      return YupInstance
    })(),
    street: Yup.string()
  })
})

export default demoSchema
