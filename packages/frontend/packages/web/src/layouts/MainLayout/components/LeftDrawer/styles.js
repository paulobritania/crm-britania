
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

const drawerWidth = Number(process.env.REACT_APP_DRAWER_WIDTH)

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: { width: theme.spacing(9) + 1 }
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    cursor: 'pointer',
    ...theme.mixins.toolbar,
    maxWidth: drawerWidth
  },
  arrowIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    height: '10%',
    marginTop: -13
  },
  switcher: {
    overflowX: 'hidden',
    backgroundColor: colors.primary.main,
    border: 0
  }
}))

export const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 19px;
  align-items: flex-start;
  width: 100%; 
`

export const LogoContainer = styled.div`
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
`
