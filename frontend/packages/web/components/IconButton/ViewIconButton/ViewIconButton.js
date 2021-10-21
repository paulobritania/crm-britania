import React from 'react'

import ViewIcon from '@britania-crm/web-components/Icons/ViewIcon'

import IconButton from '../IconButton'

const EyeOpenedIconButton = (props) => (
  <IconButton { ...props }>
    <ViewIcon size={ 24 } />
  </IconButton>
)

export default EyeOpenedIconButton
