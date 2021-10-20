import React from 'react'

import PropTypes from 'prop-types'

import {
  DeleteForeverOutlined,
  EditOutlined,
  Link
} from '@material-ui/icons'

import Tooltip from '@britania-crm/web-components/Tooltip'

import {
  ActionIconButton,
  ContainerActions
} from './styles'

const ActionButtons = ({
  id, onBind, onEdit, onDelete
}) => {
  if (!id) return null

  return (
    <ContainerActions>
      {onBind && (
        <Tooltip title="Vincular" arrow>
          <ActionIconButton color="care" onClick={ () => onBind(id) }>
            <Link fontSize="small" />
          </ActionIconButton>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title="Editar" arrow>
          <ActionIconButton color="info" onClick={ () => onEdit(id) }>
            <EditOutlined fontSize="small" />
          </ActionIconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title="Excluir" arrow>
          <ActionIconButton color="error" onClick={ () => onDelete(id) }>
            <DeleteForeverOutlined fontSize="small" />
          </ActionIconButton>
        </Tooltip>
      )}
    </ContainerActions>
  )
}

ActionButtons.propTypes = {
  id: PropTypes.number.isRequired,
  onBind: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

ActionButtons.defaultProps = {
  onBind: undefined,
  onEdit: undefined,
  onDelete: undefined
}

export default ActionButtons
