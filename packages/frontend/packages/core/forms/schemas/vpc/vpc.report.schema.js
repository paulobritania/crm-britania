import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = { reportOption: 'synthetic' }

export default ({ t }) => Yup.object().shape({ reportOption: required({ t })(Yup.string()) })
