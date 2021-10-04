import debounce from 'lodash/debounce'

const reloadSchema = debounce(
  (formRef, callback = () => {}) => {
    if (formRef?.current?.createSchema) {
      formRef.current.createSchema()
      setTimeout(callback, 100)
    }
  },
  400,
  { leading: true, trailing: false }
)

export default reloadSchema
