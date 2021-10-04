import React, { useEffect } from 'react'
import {
  Text,
  View
} from 'react-native-web'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import { makeStyles } from '@material-ui/core/styles'

import { DialogProvider } from '@britania-crm/dialog'
import {
  I18nProvider,
  dictionaries
} from '@britania-crm/i18n'
import colors from '@britania-crm/styles/colors'
import withGlobalStyles from '@britania-crm/web-src/styles/hoc/withGlobalStyles'

const useStyles = makeStyles({
  '@global': {
    html: { overflow: 'auto !important' },
    // docz fira code fix
    'div[data-testid="live-editor"]': {
      fontSize: 13,
      '& textarea': { letterSpacing: '0.115em !important' }
    },
    // docz dark theme fix
    'div[data-testid="live-preview"]': {
      color: colors.text,
      display: 'flex'
    }
  }
})

const DoczProvider = (props) => {
  const { children } = props

  useStyles()

  useEffect(() => {
    if (process.env.REACT_APP_AMBIENTE === 'development') {
      // eslint-disable-next-line no-console
      console.info(
        'You can apply react providers by editing the "src/gatsby-theme-docz/wrapper.js"'
      )
    }
  }, [])

  // desabilita zoom no documentador em dispositivos móveis
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]')
    meta.setAttribute(
      'content',
      'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,shrink-to-fit=no'
    )
  }, [])

  return (
    <I18nProvider
      language="pt-BR"
      dictionaries={ dictionaries }
      fallbackComponent={ <View /> }
      textComponent={ Text }
    >
      <DialogProvider
        ContainerComponent={ ({ children: dialogs }) => !isEmpty(dialogs) && (
          <div style={ {
            zIndex: 9999,
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0
          } }
          >
            {dialogs}
          </div>
        ) }
      >
        <div
          style={ {
            flex: 1,
            fontFamily: '\'Google Sans\', sans-serif'
          } }
        >
          {children}
        </div>
      </DialogProvider>
    </I18nProvider>
  )
}

DoczProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any
}

DoczProvider.defaultProps = { children: null }

export default withGlobalStyles(DoczProvider)
