import React from 'react'

import { useT } from '@britania-crm/i18n'
import FullScreenIcon from '@britania-crm/web-components/Icons/FullScreenIcon'

import IconButton from '../IconButton'

const FullScreenIconButton = (props) => {
  const t = useT()

  return (
    <IconButton tooltip={ t('active fullscreen') } { ...props }>
      <FullScreenIcon />
    </IconButton>
  )
}

export default FullScreenIconButton
