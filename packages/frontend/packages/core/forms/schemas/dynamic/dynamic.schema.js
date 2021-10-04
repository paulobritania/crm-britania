/* eslint-disable object-curly-newline */
import * as Yup from 'yup'

import reduce from 'lodash/reduce'

import dynamicValidator from '@britania-crm/forms/validators/dynamic.validator'

export default (schema, { t }) => Yup.object().shape(
  reduce(
    schema,
    (acc, { name, ...field }) => ({
      ...acc,
      [name]: dynamicValidator({ t, ...field })
    }),
    {}
  )
)
