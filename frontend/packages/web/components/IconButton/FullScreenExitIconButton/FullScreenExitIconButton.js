import React from 'react'

import { useT } from '@britania-crm/i18n'
import FullScreenExitIcon from '@britania-crm/web-components/Icons/FullScreenExitIcon'

import IconButton from '../IconButton'

const FullScreenExitIconButton = (props) => {
  const t = useT()

  return (
    <IconButton tooltip={ t('exit fullscreen') } { ...props }>
      <FullScreenExitIcon />
    </IconButton>
  )
}

export default FullScreenExitIconButton
