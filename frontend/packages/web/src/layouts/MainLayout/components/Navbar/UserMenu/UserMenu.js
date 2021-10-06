import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { useT } from '@britania-crm/i18n'
import { AuthActions } from '@britania-crm/stores/auth'
import LogoutIcon from '@britania-crm/web-components/Icons/LogoutIcon'

import useStyles from './styles'

const UserMenu = (props) => {
  const { onClosePopup } = props

  const dispatch = useCallback(useDispatch(), [])

  const classes = useStyles()

  const t = useT()

  const handleClick = useCallback(
    (onClick) => {
      onClick()
      onClosePopup()
    },
    [onClosePopup]
  )

  const createOption = useCallback(
    ({
      icon, text, onClick
    }) => (
      <>
        <ListItem className={ classes.item } button onClick={ () => handleClick(onClick) }>
          <ListItemIcon classes={ { root: classes.listItemIcon } }>
            {icon}
          </ListItemIcon>
          <ListItemText primary={ text } />
        </ListItem>
        <Divider style={ { margin: 0 } } />
      </>
    ),
    [handleClick, classes]
  )

  return (
    <List className={ classes.container }>
      {createOption({
        icon: <LogoutIcon size={ 18 } />,
        text: t('logout'),
        onClick () {
          dispatch(AuthActions.logout())
        }
      })}
    </List>
  )
}

UserMenu.propTypes = { onClosePopup: PropTypes.func }

UserMenu.defaultProps = { onClosePopup () {} }

export default UserMenu
