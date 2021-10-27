import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingBottom: 10,
    position: 'relative'
  }
}))

export const Main = styled.div`
  margin-top: 50px;
  margin-left: ${ ({ openLeftDrawer, drawerWidth }) => openLeftDrawer ? drawerWidth : 73 }px;
  margin-bottom: 0;
  margin-right: ${ ({ openRightDrawer, drawerWidth }) => openRightDrawer ? drawerWidth : 73 }px;
  transition: all .2s ease-in-out;
`
