import React, { Suspense } from 'react'
import { withRouter } from 'react-router-dom'

import CircularLoader from '@britania-crm/web-components/Loader/CircularLoader'

import GuestLayout from './GuestLayout/GuestLayout'
import MainLayout from './MainLayout/MainLayout'

/**
 * High Order Component that provides Layout to Components
 *
 * @param nextLayout string
 * @returns {function(*): *}
 */
export const withLayout = (nextLayout) => (ScreenRouter) => {
  let LayoutComponent

  switch (nextLayout) {
    case 'guest':
      LayoutComponent = GuestLayout
      break
    case 'main':
      LayoutComponent = MainLayout
      break
    default:
      LayoutComponent = function () {
        return null
      }
      break
  }

  const wrapped = (props) => (
    <Suspense fallback={ <CircularLoader /> }>
      <LayoutComponent { ...props }>
        <ScreenRouter { ...props } />
      </LayoutComponent>
    </Suspense>
  )

  return withRouter(wrapped)
}
