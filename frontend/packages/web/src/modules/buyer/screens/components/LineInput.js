import React, { forwardRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import isEmpty from 'lodash/isEmpty'

import { useT } from '@britania-crm/i18n'
import { AppActions } from '@britania-crm/stores/app'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useLinesBuyers } from '@britania-crm/services/hooks/useLinesBuyers'
import { useDialog } from '@britania-crm/dialog'
import { lines as linesCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'

import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import InputSelect from '@britania-crm/web-components/InputSelect'

const LineInput = forwardRef((props, ref) => {
  const { index, matrixCode, isView, formRef } = props
  const t = useT()
  const dispatch = useCallback(useDispatch(), [])
  const { createDialog } = useDialog()
  const { linesBuyers, handleLineChange, handleArrayLines, linesFromApi } =
    useLinesBuyers()

  const { loading: linesFromApiLoading } = useCrmApi(
    matrixCode && isEmpty(linesFromApi[index])
      ? [linesCrmRoutes.getAll, matrixCode]
      : null,
    { params: { clientTotvsCode: matrixCode } },
    {
      onSuccess(data) {
        handleArrayLines(index, data)
      },
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
      ref={ref}
      detached
      valueKey='lineDescription'
      idKey='lineCode'
      disabled={isEmpty(linesFromApi[index])}
      value={linesBuyers[index].line}
      onChange={(e) => handleLineChange(index, e, formRef)}
      name='line'
      label={t('line', { howMany: 1 })}
      id='select-line'
      required
      loading={linesFromApiLoading}
      options={linesFromApi[index]}
    />
  )
})

export default LineInput
