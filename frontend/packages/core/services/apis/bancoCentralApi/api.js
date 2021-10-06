import { useMemo } from 'react'

import axios from 'axios'

import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'

import useFetch from '../../hooks/useFetch'

const api = axios.create({ baseURL: 'https://olinda.bcb.gov.br/olinda/servico/CCR/versao/v1/odata/' })

const useBancoCentralApi = (url, axiosParams, swrConfigs) => useFetch(api, url, axiosParams, swrConfigs)

const useBanksList = () => {
  const { data, ...rest } = useBancoCentralApi(
    'InstituicoesFinanceirasAutorizadas',
    { params: { '%24format': 'json' } },
    { revalidateOnFocus: false }
  )

  const formatted = useMemo(
    () => flow(
      filter((item) => item.Pais === 'Brasil'),
      map((item) => ({
        ...item,
        label: `${ item.CodigoSicap } - ${ item.Nome }`
      }))
    )(data?.value),
    [data]
  )

  return { data: formatted, ...rest }
}

export { useBanksList }

export default api
