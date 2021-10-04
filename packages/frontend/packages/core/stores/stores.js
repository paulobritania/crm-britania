import React from 'react'
import { Provider } from 'react-redux'

import { createTransform } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import {
  parse,
  stringify
} from 'flatted'
import PropTypes from 'prop-types'

import find from 'lodash/find'

const StoreProvider = ({ store, children }) => (
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ store.persist() }>
      {children}
    </PersistGate>
  </Provider>
)

StoreProvider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
}

const blacklistTransform = (...blackListKey) => createTransform(
  (inboundState, key) => {
    if (!find(blackListKey, (item) => item === key)) {
      return inboundState
    }
    return undefined
  }
)

const circularTransform = createTransform(
  (inboundState) => stringify(inboundState),
  (outboundState) => parse(outboundState)
)

export {
  StoreProvider,
  blacklistTransform,
  circularTransform
}
