import React, { useEffect, useState } from 'react'

import { AppActions } from '@britania-crm/stores/app'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'

import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

const FamilyInput = ({
  index,
  matrixCode,
  linesCrmRoutes,
  familiesByLine,
  isView
}) => {
  const [familiesFromApiLoading, setFamiliesFromApiLoading] = useState(false)
  const [familiesFromApi, setFamiliesFromApi] = useState([])

  useEffect(() => {
    const { data: familiesFromApi, loading: familiesFromApiLoading } =
      useCrmApi(
        matrixCode && familiesByLine[index].line
          ? [
              linesCrmRoutes.getFamilies,
              {
                clientTotvsCode: matrixCode,
                lines: familiesByLine[index].line
              }
            ]
          : null,
        {
          params: {
            clientTotvsCode: matrixCode,
            lines: familiesByLine[index].line
          }
        },
        {
          onErrorRetry(error, key, config, revalidate, { retryCount }) {
            if (error.response.status === 500 && retryCount < 5 && !isView) {
              createDialog({
                id: 'new-request-family-modal',
                Component: ConfirmModal,
                props: {
                  onConfirm() {
                    revalidate({ retryCount })
                  },
                  text: t('search error family')
                }
              })
            } else {
              dispatch(
                AppActions.addAlert({
                  type: 'error',
                  message: t('maximum number of attempts reached')
                })
              )
            }
          },
          revalidateOnFocus: false
        }
      )
  }, [index])

  return (
    <InputSelect
      detached
      valueKey='familyDescription'
      idKey='familyCode'
      disabled={isEmpty(familiesFromApi)}
      value={lines.family}
      onChange={handleLineChange(idx)}
      name='family'
      label={t('family', { howMany: 1 })}
      id='select-family'
      loading={familiesFromApiLoading}
      required
      options={familiesFromApi}
    />
  )
}

export default FamilyInput
