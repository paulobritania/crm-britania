import React, {
  Suspense,
  memo,
  useMemo,
  useLayoutEffect
} from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import supportsHistory from '@meta-awesome/functions/src/supportsHistory'

import { useT } from '@britania-crm/i18n'
import crmApi from '@britania-crm/services/apis/crmApi'
import { useSnackbar } from '@britania-crm/snackbar'
import { selectIsAuthenticated } from '@britania-crm/stores/auth/auth.selectors'
import CircularLoader from '@britania-crm/web-components/Loader/CircularLoader'
import GuestLayout from '@britania-crm/web-src/layouts/GuestLayout'
import MainLayout from '@britania-crm/web-src/layouts/MainLayout'

import AuthenticatedScreenRouter from './AuthenticatedScreenRouter'
import GuestScreenRouter from './GuestScreenRouter'
const forceRefresh = !supportsHistory()

const ScreenRouter = () => {
  const snackbar = useSnackbar()
  const t = useT()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const RouterContext = useMemo(
    () => isAuthenticated ? AuthenticatedScreenRouter : GuestScreenRouter,
    [isAuthenticated]
  )

  const Layout = useMemo(
    () => isAuthenticated ? MainLayout : GuestLayout,
    [isAuthenticated]
  )

  useLayoutEffect(
    () => {
      crmApi.interceptors.response.use(
        (response) => response,
        (error) => {
          const { response } = error
          if (
            response.data?.errorCode !== 'VALIDATION_FAILED' &&
            response.status !== 404 &&
            response.status !== 403 &&
            response.status !== 401
          ) {
            let msg = response?.data?.message
            if (msg === 'Internal server error') {
              msg = t('occurred an error when execute the operation')
            }
            snackbar.error(msg)
          }
          return Promise.reject(error)
        }
      )
    },
    [snackbar, t]
  )

  return (
    <Router forceRefresh={ forceRefresh }>
      <Layout>
        <Suspense fallback={ <CircularLoader fullSpace /> }>
          <RouterContext />
        </Suspense>
      </Layout>
    </Router>
  )
}

export default memo(ScreenRouter)
