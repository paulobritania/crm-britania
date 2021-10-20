import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'

import useSWR from 'swr'

import isEmpty from 'lodash/isEmpty'

const useFetch = (axiosInstance, url = '', axiosParams, swrConfigs) => {
  const {
    data, error, mutate, isValidating
  } = useSWR(url, async (path) => {
    const response = await axiosInstance.get(path, axiosParams)
    return response.data
  }, swrConfigs)

  const [loading, setLoading] = useState(false)

  const refresh = useCallback(
    (...mutateOptions) => {
      setLoading(true)
      mutate(...mutateOptions)
    },
    [mutate]
  )

  const state = useMemo(
    () => ({
      data,
      error,
      mutate: refresh,
      isValidating,
      loading
    }),
    [data, error, isValidating, loading, refresh]
  )

  useEffect(
    () => {
      if (isEmpty(data) && isValidating) {
        setLoading(true)
      } else if (!isValidating) {
        setLoading(false)
      }
    },
    [data, isValidating]
  )

  return state
}

export default useFetch
