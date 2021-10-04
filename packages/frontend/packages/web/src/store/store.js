import {
  createStore,
  applyMiddleware
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware
} from 'redux-offline-queue'
import { persistStore } from 'redux-persist'
import createSagaMiddleware, { END } from 'redux-saga'

import { MSG021 } from '@britania-crm/constants/feedbackMessages.constants'
import crmApi from '@britania-crm/services/apis/crmApi'
import { AppActions } from '@britania-crm/stores/app'
import { AuthActions } from '@britania-crm/stores/auth'

import reducers from './reducers'
import sagas from './sagas'

const middlewares = []

if (process.env.REACT_APP_AMBIENTE === 'development') {
  middlewares.push(createLogger({}))
}

const sagaMiddleware = createSagaMiddleware()

middlewares.push(offlineMiddleware({ stateName: 'network' }))
middlewares.push(suspendSaga(sagaMiddleware))
middlewares.push(consumeActionMiddleware())

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
)

store.close = () => store.dispatch(END)
store.persist = () => persistStore(store)
store.runSagas = sagaMiddleware.run
store.runSagas(sagas)

/*
  Add header Authorization when store contains accessToken
  or remove when it not contains accessToken
*/
store.subscribe(() => {
  const { accessToken } = store.getState().auth

  if (accessToken) {
    crmApi.defaults.headers.common.Authorization = `Bearer ${ accessToken }`
  } else {
    const { Authorization, ...common } = crmApi.defaults.headers.common || {}
    crmApi.defaults.headers.common = common
  }
})

crmApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response = {} } = error || {}

    const { status } = response

    if (status === 401) {
      const { accessToken } = store.getState().auth
      if (accessToken) {
        store.dispatch(AuthActions.logout())

        if (status === 401) {
          store.dispatch(AppActions.addAlert({ type: 'warning', message: MSG021 }))
        } else {
          store.dispatch(AppActions.addAlert({ type: 'warning', message: 'Você não tem permissão para acessar essa área do sistema. Faça login novamente.' }))
        }
      }
    }

    return Promise.reject(
      (status === 403 || status === 401)
        ? {
          ...error,
          message: MSG021
        }
        : error
    )
  }
)

export default store
