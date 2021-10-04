import React, {
  useEffect,
  useCallback,
  useRef
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { Link } from 'react-router-dom'

import Box from '@material-ui/core/Box'

import { AUTH_STATUS } from '@britania-crm/constants/auth.constants'
import loginSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/auth/login.schema'
import { useT } from '@britania-crm/i18n'
import { useSnackbar } from '@britania-crm/snackbar'
import { AuthActions } from '@britania-crm/stores/auth'
import {
  selectAuthError,
  selectAuthStatus
} from '@britania-crm/stores/auth/auth.selectors'
import { decode } from '@britania-crm/utils/crypto'
import { getErrorMessage } from '@britania-crm/utils/error'
import Form from '@britania-crm/web-components/Form'
import EntryIcon from '@britania-crm/web-components/Icons/EntryIcon'
import InputPassword from '@britania-crm/web-components/InputPassword'
import InputUsername from '@britania-crm/web-components/InputUsername'
import { useRoutes } from '@britania-crm/web-src/routes/guest.routes'

import {
  LoginButton,
  LoginLabelForgotPassword
} from './styles'

const LoginForm = () => {
  const snackbar = useSnackbar()
  const t = useT()

  const formRef = useRef(null)

  const dispatch = useDispatch()
  const { routes } = useRoutes()

  const error = useSelector(selectAuthError)
  const authStatus = useSelector(selectAuthStatus)

  const handleSubmit = useCallback(
    (values) => {
      dispatch(AuthActions.login(
        values.login,
        values.password,
        values.rememberUser
      ))
    },
    [dispatch]
  )

  useEffect(() => {
    if (error) {
      snackbar.error(getErrorMessage(error))
    }
  }, [snackbar, error])

  useEffect(() => {
    const login = localStorage.getItem('login')
    const password = localStorage.getItem('password')

    if (login && password) {
      formRef.current.setFieldValue('login', login)
      formRef.current.setFieldValue('password', decode(password))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Form
      ref={ formRef }
      onSubmit={ handleSubmit }
      schemaConstructor={ loginSchema }
      defaultValues={ INITIAL_VALUES }
    >
      <InputUsername
        name="login"
        label={ t('user', { howMany: 1 }) }
        placeholder={ t('user', { howMany: 1 }) }
      />

      <InputPassword
        name="password"
        label={ t('password') }
        placeholder={ t('password') }
        style={ { marginTop: 15 } }
      />

      <Link to={ routes.forgotPassword.path }>
        <LoginLabelForgotPassword>
          {t('I forgot my password')}
        </LoginLabelForgotPassword>
      </Link>

      <Box style={ { marginTop: 20, padding: '0 8px' } }>
        <LoginButton
          type="submit"
          variant="contained"
          color="secondary"
          startIcon={ <EntryIcon /> }
          disabled={ authStatus === AUTH_STATUS.LOADING }
          onClick={ () => formRef.current.submit() }
        >
            Entrar
        </LoginButton>
      </Box>
    </Form>
  )
}

export default LoginForm
