import React from 'react'

import { useT } from '@britania-crm/i18n'
import CloseIcon from '@britania-crm/web-components/Icons/CloseIcon'

import IconButton from '../IconButton'

const CloseIconButton = (props) => {
  const t = useT()

  return (
    <IconButton tooltip={ t('close') } { ...props }>
      <CloseIcon />
    </IconButton>
  )
}

export default CloseIconButton
