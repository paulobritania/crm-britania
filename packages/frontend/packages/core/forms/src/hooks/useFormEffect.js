import {
  useState,
  useEffect
} from 'react'

const useFormEffect = (cb, args = []) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted) {
      cb()
    } else if (!mounted) {
      setMounted(true)
    }
  }, [mounted, ...args]) // eslint-disable-line
}

export default useFormEffect
