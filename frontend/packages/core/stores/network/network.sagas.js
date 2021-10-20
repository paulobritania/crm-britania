import {
  OFFLINE,
  ONLINE
} from 'redux-offline-queue'
import {
  put,
  take
} from 'redux-saga/effects'

export function startWatchingNetworkConnectivity (networkChannel) {
  return function* watchNetworkConnectivity () {
    try {
      while (true) {
        const hasInternet = yield take(networkChannel)
        if (hasInternet) {
          yield put({ type: ONLINE })
        } else {
          yield put({ type: OFFLINE })
        }
      }
    } finally {
      networkChannel.close()
    }
  }
}
