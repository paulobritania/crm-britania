import crmApi from '../apis/crmApi/api'
import useFetch from './useFetch'

const useCrmApi = (url, axiosParams, swrConfigs) => useFetch(crmApi, url, axiosParams, swrConfigs)

export default useCrmApi
