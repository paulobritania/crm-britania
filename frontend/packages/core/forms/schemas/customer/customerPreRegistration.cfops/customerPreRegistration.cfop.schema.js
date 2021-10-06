import * as Yup from 'yup'

import mapValues from 'lodash/mapValues'

export const INITIAL_VALUES = {
  manufacturedCode: {},
  manufacturedDescription: {},
  manufacturedVpcCode: {},
  manufacturedVpcDescription: {},
  nationalCode: {},
  nationalDescription: {},
  nationalVpcCode: {},
  nationalVpcDescription: {},
  importedCode: {},
  importedDescription: {},
  importedVpcCode: {},
  importedVpcDescription: {}
}

export default () => Yup.object().shape({ ...mapValues(INITIAL_VALUES, () => Yup.object()) })
