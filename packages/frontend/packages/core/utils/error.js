import { MSG019 } from '@britania-crm/constants/feedbackMessages.constants'

export const getErrorMessage = (errorObj) => {
  const internalErrorMessage = MSG019

  return (!errorObj?.status || errorObj.status === 500)
    ? internalErrorMessage
    : errorObj.data.message
}
