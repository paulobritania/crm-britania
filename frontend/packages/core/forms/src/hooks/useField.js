import {
  createContext,
  useContext
} from 'react'

export const FieldContext = createContext()

const useField = () => useContext(FieldContext)

export default useField
