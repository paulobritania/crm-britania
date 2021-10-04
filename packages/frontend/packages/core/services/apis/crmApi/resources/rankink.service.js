import api from '../api'
import {
  ranking,
  clients
} from './routes'

export const getRankings = async () => {
  const { data } = await api.get(ranking.get)
  return data
}

export const putRankings = async (payload) => {
  const { data } = await api.put(ranking.put, payload)
  return data
}

export const putRankingsChangeRanking = async (clientTotvsCode, payload) => {
  const url = clients.getPutUrlRankingChangeRanking.replace(':clientTotvsCode', clientTotvsCode)
  const { data } = await api.put(url, payload)
  return data
}
