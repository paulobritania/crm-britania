import {
  useRef,
  useEffect
} from 'react'

const useEffectOnlyDidUpdate = (cb, args = []) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) {
      cb()
    } else {
      didMount.current = true
    }
  }, args) // eslint-disable-line
}

export default useEffectOnlyDidUpdate
