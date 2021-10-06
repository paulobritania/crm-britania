import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { blacklistTransform } from '@britania-crm/stores'
import access from '@britania-crm/stores/access/access.reducer'
import app from '@britania-crm/stores/app/app.reducer'
import auth from '@britania-crm/stores/auth/auth.reducer'
import buyer from '@britania-crm/stores/buyer/buyer.reducer'
import customer from '@britania-crm/stores/customer/customer.reducer'
import documents from '@britania-crm/stores/documents/documents.reducer'
import fans from '@britania-crm/stores/fan/fan.reducer'
import file from '@britania-crm/stores/file/file.reducer'
import message from '@britania-crm/stores/message/message.reducer'
import network from '@britania-crm/stores/network/network.reducer'
import profiles from '@britania-crm/stores/profiles/profiles.reducer'
import representative from '@britania-crm/stores/representative/representative.reducer'
import users from '@britania-crm/stores/users/users.reducer'
import vpc from '@britania-crm/stores/vpc/vpc.reducer'
import workflow from '@britania-crm/stores/workflow/workflow.reducer'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['network', 'app', 'auth', 'message']
}

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['error', 'status']
}

const networkPersistConfig = {
  key: 'network',
  storage,
  transforms: [blacklistTransform('isConnected')]
}

const messagePersistConfig = {
  key: 'message',
  storage,
  transforms: [blacklistTransform('loading')]
}

const profilesPersistConfig = {
  key: 'profiles',
  storage
}

const workflowPersistConfig = {
  key: 'workflow',
  storage
}

const filePersistConfig = {
  key: 'file',
  storage
}

const accessPersistConfig = {
  key: 'access',
  storage
}

const buyerPersistConfig = {
  key: 'buyer',
  storage
}

const customerPersistConfig = {
  key: 'customer',
  storage
}

const representativePersistConfig = {
  key: 'representative',
  storage
}

const documentsPersistConfig = {
  key: 'documents',
  storage
}

const fanPersistConfig = {
  key: 'fans',
  storage
}

const rootReducer = combineReducers({
  app,
  auth: persistReducer(authPersistConfig, auth),
  network: persistReducer(networkPersistConfig, network),
  message: persistReducer(messagePersistConfig, message),
  profiles: persistReducer(profilesPersistConfig, profiles),
  file: persistReducer(filePersistConfig, file),
  workflow: persistReducer(workflowPersistConfig, workflow),
  access: persistReducer(accessPersistConfig, access),
  buyer: persistReducer(buyerPersistConfig, buyer),
  customer: persistReducer(customerPersistConfig, customer),
  representative: persistReducer(representativePersistConfig, representative),
  documents: persistReducer(documentsPersistConfig, documents),
  fans: persistReducer(fanPersistConfig, fans),
  vpc,
  users
})

export default persistReducer(rootPersistConfig, rootReducer)
