import React from 'react'

import { useT } from '@britania-crm/i18n'
import EyeClosedIcon from '@britania-crm/web-components/Icons/EyeClosedIcon'

import IconButton from '../IconButton'

const EyeClosedIconButton = (props) => {
  const t = useT()

  return (
    <IconButton tooltip={ t('exit fullscreen') } { ...props }>
      <EyeClosedIcon />
    </IconButton>
  )
}

export default EyeClosedIconButton
