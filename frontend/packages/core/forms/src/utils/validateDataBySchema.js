const validateDataBySchema = async ({ data, schema }) => {
  try {
    await schema.validate(data, { abortEarly: false })
    return { formError: false }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const error = {
        formError: true,
        messages: {}
      }
      err.inner.forEach((field) => {
        error.messages[field.path] = field.message
      })
      throw error
    }
    // eslint-disable-next-line no-console
    console.error('Occurred one error on validating Yup Schema', err)
    throw err
  }
}

export default validateDataBySchema
