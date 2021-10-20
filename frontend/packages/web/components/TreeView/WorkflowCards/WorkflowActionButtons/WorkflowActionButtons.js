import React from 'react'

import PropTypes from 'prop-types'

import {
  PencilRoundIcon,
  ThrashRoundIcon
} from '@britania-crm/web-components/Icons'
import LightTooltip from '@britania-crm/web-components/LightTooltip'

import {
  ActionIconButton,
  ContainerActions
} from './styles'

const WorkflowActionButtons = ({
  node, onEdit, onDelete
}) => {
  if (!node) return null

  return (
    <ContainerActions>
      {onEdit && (
        <LightTooltip title="Editar" arrow>
          <ActionIconButton color="info" onClick={ () => onEdit(node) }>
            <PencilRoundIcon fontSize="small" />
          </ActionIconButton>
        </LightTooltip>
      )}
      {onDelete && (
        <LightTooltip title="Excluir" arrow>
          <ActionIconButton color="error" onClick={ onDelete(node.id) }>
            <ThrashRoundIcon fontSize="small" />
          </ActionIconButton>
        </LightTooltip>
      )}
    </ContainerActions>
  )
}

WorkflowActionButtons.propTypes = {
  node: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

WorkflowActionButtons.defaultProps = {
  onEdit: undefined,
  onDelete: undefined
}

export default WorkflowActionButtons
