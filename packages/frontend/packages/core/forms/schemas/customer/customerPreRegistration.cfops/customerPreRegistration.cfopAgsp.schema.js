import * as Yup from 'yup'

import mapValues from 'lodash/mapValues'

export const INITIAL_VALUES = {
  agSpTvCode: {},
  agSpTvDescription: {},
  agSpTvStCode: {},
  agSpTvStDescription: {},
  agSpMicrowavesCode: {},
  agSpMicrowavesDescription: {},
  agSpMicrowavesStCode: {},
  agSpMicrowavesStDescription: {},
  agSpArconCode: {},
  agSpArconDescription: {},
  agSpArconStCode: {},
  agSpArconStDescription: {},
  agSpMonitorCode: {},
  agSpMonitorDescription: {},
  agSpMonitorStCode: {},
  agSpMonitorStDescription: {}
}

export default () => Yup.object().shape({ ...mapValues(INITIAL_VALUES, () => Yup.object()) })
