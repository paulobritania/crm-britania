import React, { forwardRef } from 'react'

import { useT } from '@britania-crm/i18n'
import { AppActions } from '@britania-crm/stores/app'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useLinesBuyers } from '@britania-crm/services/hooks/useLinesBuyers'

import { lines as linesCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'

import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import InputSelect from '@britania-crm/web-components/InputSelect'

const LineInput = forwardRef((props, ref) => {
  const { index, matrixCode } = props
  const t = useT()
  const { linesBuyers, handleLineChange } = useLinesBuyers()

  const { data: linesFromApi, loading: linesFromApiLoading } = useCrmApi(
    matrixCode ? [linesCrmRoutes.getAll, matrixCode] : null,
    { params: { clientTotvsCode: matrixCode } },
    {
      onErrorRetry(error, key, config, revalidate, { retryCount }) {
        if (error.response.status === 500 && retryCount < 5 && !isView) {
          createDialog({
            id: 'new-request-modal',
            Component: ConfirmModal,
            props: {
              onConfirm() {
                revalidate({ retryCount })
              },
              text: t('search error line')
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

  return (
    <InputSelect
      detached
      valueKey='lineDescription'
      idKey='lineCode'
      disabled={!linesBuyers}
      value={linesBuyers[index].line}
      onChange={(e) => handleLineChange(index, e)}
      name='line'
      label={t('line', { howMany: 1 })}
      id='select-line'
      required
      loading={linesFromApiLoading}
      options={linesFromApi}
    />
  )
})

export default LineInput
