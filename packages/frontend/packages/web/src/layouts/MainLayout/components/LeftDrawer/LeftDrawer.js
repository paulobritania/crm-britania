import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

import { AppActions } from '@britania-crm/stores/app'
import { colors } from '@britania-crm/styles'
import Logo from '@britania-crm/styles/assets/images/logo.svg'
import IconButton from '@britania-crm/web-components/IconButton'
import {
  LeftEar,
  ReminderIcon
} from '@britania-crm/web-components/Icons'
import MenuItem from '@britania-crm/web-components/MenuItem'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import {
  useStyles,
  MenuContainer,
  LogoContainer
} from './styles'

const LeftDrawer = ({
  openLeftDrawer,
  handleLeftDrawerOpen
}) => {
  const { routes } = useRoutes()

  const dispatch = useCallback(useDispatch(), [])

  const classes = useStyles()

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className={ clsx(classes.drawer, {
        [classes.drawerOpen]: openLeftDrawer,
        [classes.drawerClose]: !openLeftDrawer
      }) }
      classes={ {
        paper: clsx(classes.switcher, {
          [classes.drawerOpen]: openLeftDrawer,
          [classes.drawerClose]: !openLeftDrawer
        })
      } }
    >
      <div className={ classes.toolbar }>
        <LogoContainer>
          <img alt="Dínamo" src={ Logo } style={ { width: '100%' } } />
        </LogoContainer>
        <Divider style={ {
          marginTop: 10,
          width: '70%',
          marginLeft: openLeftDrawer ? 0 : -10,
          background: colors.grayBlue,
          height: 2,
          borderRadius: 50
        } }
        />
      </div>

      <MenuContainer>
        <List>
          {map(routes, ({ path, menu }) => menu?.root && (
            <MenuItem
              key={ path }
              url={ path }
              label={ menu.title }
              Icon={ menu.Icon }
              exact={ menu.exact }
              drawerIsOpen={ openLeftDrawer }
              subMenu={ menu?.subMenu }
              withIndicator
              handleLeftDrawerOpen={ handleLeftDrawerOpen }
            />
          ))}

          <MenuItem
            key="reminders"
            label="Lembretes"
            Icon={ ReminderIcon }
            onOpen={ () => {
              dispatch(AppActions.createNewReminderRequest())
            } }
            drawerIsOpen={ openLeftDrawer }
            withIndicator
          />
        </List>

        <div className={ classes.arrowIcon }>
          <IconButton onClick={ handleLeftDrawerOpen } style={ { padding: 0 } }>
            <LeftEar />
          </IconButton>
        </div>
      </MenuContainer>
    </Drawer>
  )
}

LeftDrawer.propTypes = {
  openLeftDrawer: PropTypes.bool.isRequired,
  handleLeftDrawerOpen: PropTypes.func.isRequired
}

export default LeftDrawer
