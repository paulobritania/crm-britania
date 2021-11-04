import { useMemo, lazy } from 'react'

import omitBy from 'lodash/omitBy'

const LoginScreen = lazy(() =>
  import('@britania-crm/web-src/modules/auth/screens/LoginScreen')
)
const ForgotPasswordScreen = lazy(() =>
  import('@britania-crm/web-src/modules/auth/screens/ForgotPasswordScreen')
)
const BankFormScreen = lazy(() =>
  import('@britania-crm/web-src/modules/banks/screens/BankFormScreen')
)

export const useRoutes = () => {
  const commonRoutes = useMemo(
    () => ({
      login: {
        path: '/login',
        exact: true,
        Component: LoginScreen
      },
      forgotPassword: {
        path: '/forgot-password',
        exact: true,
        Component: ForgotPasswordScreen
      },
      newBank: {
        path: '/banks/create',
        exact: true,
        Component: BankFormScreen
      }
    }),
    []
  )

  const toolkit = useMemo(
    () => ({ routes: omitBy(commonRoutes, (route) => route.disabled) }),
    [commonRoutes]
  )

  return toolkit
}
