import React, {
  useMemo,
  useState,
  useCallback
} from 'react'
import {
  NavLink,
  useLocation
} from 'react-router-dom'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import startsWith from 'lodash/startsWith'

import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

import { useStyles } from './styles'

const MenuItem = (props) => {
  const {
    drawerIsOpen,
    Icon,
    label,
    onOpen,
    url,
    exact,
    withIndicator,
    subMenu,
    listItemClassName,
    handleLeftDrawerOpen
  } = props

  const classes = useStyles()
  const { pathname } = useLocation()

  const [openSubMenu, setOpenSubMenu] = useState(false)

  const hasSubMenu = useMemo(() => !isEmpty(subMenu), [subMenu])

  const handleItemClick = useCallback(
    () => {
      onOpen()
      if (hasSubMenu) {
        if (!drawerIsOpen) {
          handleLeftDrawerOpen()
          setOpenSubMenu(true)
        } else {
          setOpenSubMenu((old) => !old)
        }
      }
    },
    [drawerIsOpen, handleLeftDrawerOpen, hasSubMenu, onOpen]
  )

  const menuItem = useMemo(
    () => {
      const item = (
        <>
          {withIndicator && <div className={ classes.activeIndicator } />}

          {Icon && (
            <ListItemIcon classes={ { root: classes.listItemIcon } }>
              <Icon fontSize="small" />
            </ListItemIcon>
          )}
          {drawerIsOpen && (
            <ListItemText
              primary={ label }
              primaryTypographyProps={ { noWrap: true, style: { lineHeight: 1 } } }
              classes={ { root: classes.text } }
            />
          )}

          {hasSubMenu && drawerIsOpen && (
            <ListItemIcon classes={ { root: classes.listItemIcon } }>
              {openSubMenu ? <IconExpandLess fontSize="small" className={ classes.icon }/> : <IconExpandMore fontSize="small" className={ classes.icon }/>}
            </ListItemIcon>
          )}
        </>
      )

      return (hasSubMenu || !url) ? item : (
        <NavLink
          to={ url }
          exact={ exact }
          className={ classes.menuLink }
          activeClassName={ classes.menuActive }
        >
          {item}
        </NavLink>
      )
    },
    [Icon, classes.activeIndicator, classes.icon, classes.listItemIcon, classes.menuActive, classes.menuLink, classes.text, drawerIsOpen, exact, hasSubMenu, label, openSubMenu, url, withIndicator]
  )

  return (
    <>
      <ListItem
        button
        className={ clsx(listItemClassName, {
          [classes.listItem]: true,
          [classes.menuLink]: !url || hasSubMenu,
          [classes.menuActive]: hasSubMenu && startsWith(pathname, url)
        }) }
        onClick={ handleItemClick }
        classes={ { gutters: classes.gutters } }
      >
        {menuItem}
      </ListItem>

      {hasSubMenu && openSubMenu && drawerIsOpen && (
        <Collapse in={ openSubMenu } timeout="auto" unmountOnExit className={ classes.subMenu }>
          <Divider />
          <List component="div" disablePadding>
            {map(subMenu, ({ path, menu } = {}) => path && (
              <MenuItem
                key={ path }
                url={ path }
                label={ menu.title }
                Icon={ menu.Icon }
                exact={ menu.exact }
                drawerIsOpen={ drawerIsOpen }
                subMenu={ menu?.subMenu }
                listItemClassName={ classes.listItem }
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

MenuItem.propTypes = {
  drawerIsOpen: PropTypes.bool.isRequired,
  Icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  label: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  url: PropTypes.string,
  exact: PropTypes.bool,
  subMenu: PropTypes.array,
  withIndicator: PropTypes.bool,
  listItemClassName: PropTypes.string,
  handleLeftDrawerOpen: PropTypes.func
}

MenuItem.defaultProps = {
  Icon: null,
  url: '',
  exact: false,
  onOpen () {},
  subMenu: undefined,
  withIndicator: false,
  listItemClassName: null,
  handleLeftDrawerOpen () {}
}

export default MenuItem
