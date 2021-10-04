import * as Yup from 'yup'

import mapValues from 'lodash/mapValues'

export const INITIAL_VALUES = {
  manufacturedStCode: {},
  manufacturedStDescription: {},
  nationalStCode: {},
  nationalStDescription: {},
  nationalStVpcCode: {},
  nationalStVpcDescription: {},
  importedStCode: {},
  importedStDescription: {},
  importedStVpcCode: {},
  importedStVpcDescription: {}
}

export default () => Yup.object().shape({ ...mapValues(INITIAL_VALUES, () => Yup.object()) })
