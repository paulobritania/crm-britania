import * as Yup from 'yup'

import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'

import dateRange from '@britania-crm/forms/validators/dateRange.validator'
import email from '@britania-crm/forms/validators/email.validator'
import file from '@britania-crm/forms/validators/file.validator'
import phone from '@britania-crm/forms/validators/phone.validator'
import required from '@britania-crm/forms/validators/required.validator'
// import ImgProfilePlaceholder from '@britania-crm/styles/assets/images/profile_avatar_default.png'

export const INITIAL_VALUES = {
  imageFile: '',
  imageId: null,
  username: '',
  integratedAd: false,
  email: '',
  phone: '',
  representativeCodes: [],
  customerHierarchyEnabled: false,
  substituteUserId: {},
  substituteUserPeriod: {
    from: '',
    to: ''
  },
  isActive: true,
  profiles: []
}

export default ({ t, data }) => Yup.object().shape({
  username: required({ t })(Yup.string()),
  email: flow(
    email({ t }),
    required({ t })
  )(Yup.string()),
  phone: phone({ t })(Yup.string()),
  representativeCodes: Yup.array(),
  representativeCodesChecked: Yup.bool(),
  customerHierarchyEnabled: Yup.bool(),
  substituteUserId: Yup.object(),
  substituteUserPeriod: (() => {
    let YupInstance = dateRange({ t })(Yup.object())
    if (!isEmpty(data.substituteUserId)) {
      YupInstance = required({
        t,
        isNotText: true,
        isDateRange: true
      })(YupInstance)
    }
    return YupInstance
  })(),
  profiles: required({ t, isNotText: true })(Yup.array()),
  imageFile: file({ t })(Yup.mixed()),

  // campos não utilizados no form
  imageId: Yup.number().nullable(),
  integratedAd: Yup.bool(),
  isActive: Yup.bool()
})
