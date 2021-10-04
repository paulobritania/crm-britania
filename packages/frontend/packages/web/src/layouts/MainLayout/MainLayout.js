import React, {
  useMemo,
  useState,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import AlertList from '@britania-crm/web-src/modules/app/containers/AlertList'

import LeftDrawer from './components/LeftDrawer/LeftDrawer'
import Navbar from './components/Navbar/Navbar'
import RightDrawer from './components/RightDrawer/RightDrawer'
import TabsNavigation from './components/TabsNavigation/TabsNavigation'
import useStyles, { Main } from './styles'

const drawerWidth = Number(process.env.REACT_APP_DRAWER_WIDTH)

const MainLayout = ({ children }) => {
  const classes = useStyles()

  const [openLeftDrawer, setOpenLeftDrawer] = useState(false)
  const [openRightDrawer, setOpenRightDrawer] = useState(true)

  const handleLeftDrawerOpen = useCallback(
    () => setOpenLeftDrawer((old) => !old),
    []
  )

  const handleRightDrawerOpen = useCallback(
    () => setOpenRightDrawer((old) => !old),
    []
  )

  const memorizedValue = useMemo(
    () => {
      let count = 0

      count += openLeftDrawer ? drawerWidth : 73
      count += openRightDrawer ? drawerWidth : 73

      return count
    },
    [openLeftDrawer, openRightDrawer]
  )

  return (
    <>
      <AlertList />

      <div>
        <Navbar
          openLeftDrawer={ openLeftDrawer }
          drawerWidth={ drawerWidth }
          memorizedValue={ memorizedValue }
        />

        <LeftDrawer
          openLeftDrawer={ openLeftDrawer }
          handleLeftDrawerOpen={ handleLeftDrawerOpen }
        />

        {/* Content */}
        <Main
          className={ classes.content }
          drawerWidth={ drawerWidth }
          openLeftDrawer={ openLeftDrawer }
          openRightDrawer={ openRightDrawer }
        >
          <TabsNavigation />
          {children}
        </Main>

        <RightDrawer
          openRightDrawer={ openRightDrawer }
          handleRightDrawerOpen={ handleRightDrawerOpen }
        />
      </div>
    </>
  )
}

MainLayout.propTypes = { children: PropTypes.any }

MainLayout.defaultProps = { children: null }

export default MainLayout
