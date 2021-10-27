import {
  createContext,
  useContext
} from 'react'

export const FormContext = createContext()

const useForm = () => useContext(FormContext)

export default useForm
