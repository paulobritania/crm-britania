import React from 'react'

import { DialogProvider } from '@britania-crm/dialog'
import { I18nProvider, dictionaries } from '@britania-crm/i18n'
import { StoreProvider } from '@britania-crm/stores'
import { SnackbarsProvider } from '@britania-crm/web-components/Snackbar'
import { LinesBuyerProvider } from '../../core/services/hooks/useLinesBuyers'

import Router from './routes'
import store from './store'
import withGlobalStyles from './styles/hoc/withGlobalStyles'

import 'react-sortable-tree/style.css'
import 'moment/locale/pt-br'

const App = () => (
  <LinesBuyerProvider>
    <StoreProvider store={store}>
      <I18nProvider language='pt-BR' dictionaries={dictionaries}>
        <SnackbarsProvider>
          <DialogProvider>
            <Router />
          </DialogProvider>
        </SnackbarsProvider>
      </I18nProvider>
    </StoreProvider>
  </LinesBuyerProvider>
)

export default withGlobalStyles(App)
