import React from 'react'

import PropTypes from 'prop-types'

import { ThrashRoundIcon } from '@britania-crm/web-components/Icons'
import LightTooltip from '@britania-crm/web-components/LightTooltip'

import {
  ActionIconButton,
  ContainerActions
} from './styles'

const DeleteButton = ({ node, onDelete }) => {
  if (!node) return null

  return (
    <ContainerActions>
      {onDelete && (
        <LightTooltip title="Excluir" arrow>
          <ActionIconButton color="error" onClick={ onDelete(node?.id) }>
            <ThrashRoundIcon fontSize="small" />
          </ActionIconButton>
        </LightTooltip>
      )}
    </ContainerActions>
  )
}

DeleteButton.propTypes = {
  node: PropTypes.object.isRequired,
  onDelete: PropTypes.func
}

DeleteButton.defaultProps = { onDelete: undefined }

export default DeleteButton
