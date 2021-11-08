import { eventChannel } from 'redux-saga'
import { all, spawn } from 'redux-saga/effects'

import access from '@britania-crm/stores/access/access.sagas'
import app from '@britania-crm/stores/app/app.sagas'
import auth from '@britania-crm/stores/auth/auth.sagas'
import bank from '@britania-crm/stores/bank/bank.sagas'
import buyer from '@britania-crm/stores/buyer/buyer.sagas'
import companies from '@britania-crm/stores/companies/companies.sagas'
import customer from '@britania-crm/stores/customer/customer.sagas'
import documents from '@britania-crm/stores/documents/documents.sagas'
import fan from '@britania-crm/stores/fan/fan.sagas'
import field from '@britania-crm/stores/field/field.sagas'
import file from '@britania-crm/stores/file/file.sagas'
import message from '@britania-crm/stores/message/message.sagas'
import { startWatchingNetworkConnectivity } from '@britania-crm/stores/network/network.sagas'
import profiles from '@britania-crm/stores/profiles/profiles.sagas'
import representative from '@britania-crm/stores/representative/representative.sagas'
import users from '@britania-crm/stores/users/users.sagas'
import vpc from '@britania-crm/stores/vpc/vpc.sagas'
import workflow from '@britania-crm/stores/workflow/workflow.sagas'

const networkChannel = eventChannel((emitter) => {
  const onOnline = () => emitter(true)
  const onOffline = () => emitter(false)

  window.addEventListener('online', onOnline)
  window.addEventListener('offline', onOffline)

  setTimeout(() => {
    if (navigator.onLine) {
      onOnline()
    } else {
      onOffline()
    }
  }, 100)

  return () => {
    window.removeEventListener('offline', onOnline)
    window.removeEventListener('online', onOffline)
  }
})

export default function* root() {
  yield all([
    spawn(startWatchingNetworkConnectivity(networkChannel)),
    ...app,
    ...auth,
    ...message,
    ...workflow,
    ...profiles,
    ...file,
    ...access,
    ...field,
    ...users,
    ...bank,
    ...buyer,
    ...customer,
    ...representative,
    ...documents,
    ...vpc,
    ...fan,
    ...companies
  ])
}
