import React from 'react'

import phoneMask from '@britania-crm/forms/masks/phone.mask'
import TextField from '@britania-crm/web-components/TextField'

const InputPhone = (props) => (
  <TextField
    { ...props }
    type="tel"
    setMask={ phoneMask }
  />
)

export default InputPhone
