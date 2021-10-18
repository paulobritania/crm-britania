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

const FamilyInput = forwardRef((props, ref) => {
  const { index, matrixCode, isView } = props
  const t = useT()
  const dispatch = useCallback(useDispatch(), [])
  const { createDialog } = useDialog()
  const {
    linesBuyers,
    handleLineChange,
    handleArrayFamilies,
    familiesFromApi
  } = useLinesBuyers()
  const line = linesBuyers[index].line

  const { loading: familiesFromApiLoading } = useCrmApi(
    matrixCode && !!line && isEmpty(familiesFromApi[index])
      ? [linesCrmRoutes.getFamilies]
      : null,
    {
      params: {
        clientTotvsCode: matrixCode,
        lines: line
      }
    },
    {
      onSuccess(data) {
        handleArrayFamilies(index, data)
      },
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

  return (
    <InputSelect
      ref={ref}
      detached
      valueKey='familyDescription'
      idKey='familyCode'
      disabled={isEmpty(familiesFromApi[index])}
      value={linesBuyers[index].family}
      onChange={(e) => handleLineChange(index, e)}
      name='family'
      label={t('family', { howMany: 1 })}
      id='select-family'
      required
      loading={familiesFromApiLoading}
      options={familiesFromApi[index]}
    />
  )
})

export default FamilyInput
