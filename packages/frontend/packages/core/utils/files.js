import {
  useState,
  useEffect,
  useMemo
} from 'react'

export const formatPathToCloudStorageUrl = (path) => path && `${ process.env.REACT_APP_API_BASE_URL }/services/files/${ encodeURIComponent(path) }`

export const useImageLoaded = ({ src, srcSet }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!src && !srcSet) {
      return undefined
    }

    setLoaded(false)

    let active = true
    const image = new Image()
    image.src = src
    image.srcSet = srcSet
    image.onload = () => {
      if (!active) {
        return
      }
      setLoaded('loaded')
    }
    image.onerror = () => {
      if (!active) {
        return
      }
      setLoaded('error')
    }

    return () => {
      active = false
    }
  }, [src, srcSet])

  const success = useMemo(
    () => {
      const hasImg = src || srcSet
      return hasImg && loaded !== 'error'
    },
    [loaded, src, srcSet]
  )

  return success
}
