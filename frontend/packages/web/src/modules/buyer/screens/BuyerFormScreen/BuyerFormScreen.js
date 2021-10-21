import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import trimMask from '@meta-awesome/functions/src/trimMask'
import { Scope } from '@unform/core'

import { chain } from 'lodash'
import debounce from 'lodash/debounce'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import upperCase from 'lodash/upperCase'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useDialog } from '@britania-crm/dialog'
import { useFormEffect } from '@britania-crm/forms'
import buyerSchema, {
  INITIAL_VALUES
} from '@britania-crm/forms/schemas/buyer/buyer.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { buyers as buyersCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { searchStates } from '@britania-crm/services/apis/ibgeApi'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { BuyerActions } from '@britania-crm/stores/buyer'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import { CircularLoader } from '@britania-crm/web-components/Loader'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'
import { FileActions } from '@britania-crm/stores/file'
import { useLinesBuyers } from '@britania-crm/services/hooks/useLinesBuyers'

import Address from './Address'
import Lgpd from './Lgpd'
import MainData from './MainData'
import { useStyles } from './styles'

const BuyerListScreen = () => {
  const t = useT()
  const classes = useStyles()
  const { routes } = useRoutes()
  const dispatch = useCallback(useDispatch(), [])
  const history = useHistory()

  const { state } = useLocation()
  const formRef = useRef(null)
  const { createDialog } = useDialog()

  const [queryParams, setQueryParams] = useState({})
  const [loader, setLoader] = useState(false)
  const [stateOptions, setStateOptions] = useState([])
  const [cpf, setCpf] = useState('')

  const mode = useMemo(() => state?.params?.mode, [state])
  const modeView = useMemo(() => mode === 'view', [mode])
  const isEdit = useMemo(() => mode === 'edit', [mode])

  const { data: _buyerFromApi, loading } = useCrmApi(
    state?.params?.id
      ? [`${buyersCrmRoutes.getOne}/${state?.params?.id}`, state]
      : null,
    {},
    { revalidateOnFocus: false }
  )

  const buyerFromApi = useMemo(
    () =>
      !_buyerFromApi
        ? undefined
        : {
            ..._buyerFromApi,
            buyerAddress: {
              ..._buyerFromApi.buyerAddress,
              uf: _buyerFromApi.buyerAddress.uf
                ? upperCase(_buyerFromApi.buyerAddress.uf)
                : ''
            },
            parentCompanyAddress: {
              ..._buyerFromApi.parentCompanyAddress,
              uf: _buyerFromApi.parentCompanyAddress.uf
                ? upperCase(_buyerFromApi.parentCompanyAddress.uf)
                : ''
            },
            // linesFamilies: chain(_buyerFromApi?.buyerLinesFamilies)
            //   .groupBy('lineCode')
            //   .map((value, key) => ({
            //     lineCode: Number(key),
            //     lineDescription: value[0].lineDescription,
            //     family: value
            //   }))
            // .value(),
            // regionalManager: {
            //   approverCode: _buyerFromApi?.regionalManagerCode,
            //   approverDescription: _buyerFromApi?.regionalManagerDescription
            // },
            responsible: {
              code: _buyerFromApi?.responsibleCode,
              name: _buyerFromApi?.responsibleDescription
            }
          },
    [_buyerFromApi]
  )

  const { data: existenceBuyerFromApi, loading: existenceBuyerFromApiLoading } =
    useCrmApi(
      queryParams?.cpf
        ? [`${buyersCrmRoutes.haveBuyer}/${queryParams?.cpf}`]
        : null,
      null,
      { revalidateOnFocus: false }
    )

  const isDisabled = useMemo(
    () => loader || loading || existenceBuyerFromApiLoading,
    [existenceBuyerFromApiLoading, loader, loading]
  )

  const title = useMemo(() => {
    switch (mode) {
      case 'edit':
        return `${t('buyer', {
          howMany: 1
        })}  ${buyerFromApi?.clientTotvsDescription || ''}`

      case 'view':
        return `${t('buyer', {
          howMany: 1
        })}  ${buyerFromApi?.clientTotvsDescription || ''}`

      default:
        return t('new {this}', {
          gender: 'male',
          this: t('buyer', { howMany: 1 })
        })
    }
  }, [buyerFromApi, mode, t])

  const getStateOptions = useCallback(async () => {
    const states = await searchStates()
    setStateOptions(states)
  }, [])

  const onSuccessCallBack = useCallback(() => {
    history.push(routes.buyers.path)
  }, [history, routes])

  const handleSubmit = useCallback(
    (values) => {
      setLoader(true)

      const saveBuyer = (imageId) => {
        const payload = {
          ...values,
          ...buyerFromApi,
          cpf: trimMask(values.cpf),
          clientTotvsCode: Number(values.clientTotvsCode.parentCompanyCode),
          buyerAddress: {
            ...values?.buyerAddress,
            number: Number(values?.buyerAddress?.number)
          },
          parentCompanyAddress: {
            ...values?.parentCompanyAddress,
            number: Number(values?.parentCompanyAddress?.number)
          },
          telephone: trimMask(values.telephone),
          linesFamilies: values?.linesFamilies,
          regionalManagerCode: values?.regionalManager?.approverCode,
          regionalManagerDescription:
            values?.regionalManager?.approverDescription,
          responsibleCode: values?.responsible?.approverCode,
          responsibleDescription: values?.responsible?.approverDescription,
          imageId: imageId === null ? buyerFromApi.imageId?.id : imageId
        }
        dispatch(
          BuyerActions.saveBuyer(
            payload,
            () => {
              onSuccess()
              setLoader(false)
            },
            () => setLoader(false)
          )
        )
      }

      if (values.imageFile?.size) {
        dispatch(
          FileActions.uploadImage(values.imageFile, (data) => {
            saveBuyer(data)
            setLoader(false)
          })
        )
      } else {
        saveBuyer()
      }

      // if (isEdit) {
      //   dispatch(
      //     BuyerActions.editBuyer(
      //       state?.params?.id,
      //       buyer,
      //       onSuccessCallBack,
      //       () => setLoader(false)
      //     )
      //   )
      // }
    },
    [dispatch, isEdit, onSuccessCallBack, state]
  )

  const handleReset = useCallback(() => {
    if (isEdit) {
      const clientTotvs = formRef.current.getFieldValue(
        'clientTotvsDescription'
      )
      formRef.current.reset()
      formRef.current.setData({
        clientTotvsDescription: clientTotvs,
        clientTotvsCode: clientTotvs
      })
    } else {
      formRef.current.reset()
    }
  }, [isEdit])

  const debounceQuery = useCallback(
    debounce((filter) => {
      setQueryParams(filter)
    }, 1000),
    []
  )

  const handleCancel = useCallback(
    () =>
      createDialog({
        id: 'cancel-modal',
        Component: ConfirmModal,
        props: {
          onConfirm() {
            history.push(routes.buyers.path)
          },
          text:
            mode === 'create'
              ? t('Do you want to cancel the registration?')
              : t('Do you want to cancel editing?')
        }
      }),
    [createDialog, history, mode, routes.buyers.path, t]
  )

  useEffect(() => {
    if (!isEdit && !modeView) {
      const newCPF = trimMask(cpf)
      if (newCPF.length >= 11) {
        debounceQuery({ cpf: newCPF })
      }
    }
  }, [cpf, debounceQuery, existenceBuyerFromApi, modeView, isEdit])

  useEffect(() => {
    if (!state?.params?.id && mode !== 'create')
      history.replace(routes.buyers.path)
  }, [history, mode, routes, state])

  useEffect(() => {
    getStateOptions()
  }, [getStateOptions])

  useFormEffect(() => {
    if (!isEmpty(buyerFromApi)) {
      formRef.current.setData({
        ...buyerFromApi,
        imageFile: !isEmpty(buyerFromApi.file) ? buyerFromApi.file : null,
        clientTotvsDescription: {
          parentCompanyName: buyerFromApi.clientTotvsDescription,
          parentCompanyCode: buyerFromApi.clientTotvsCode
        },
        clientTotvsCode: {
          parentCompanyCode: buyerFromApi.clientTotvsCode,
          parentCompanyName: buyerFromApi.clientTotvsDescription
        },
        regionalManager: {
          approverCode: buyerFromApi.regionalManagerCode,
          approverDescription: buyerFromApi.regionalManagerDescription
        },
        responsible: {
          approverCode: buyerFromApi.responsibleCode,
          approverDescription: buyerFromApi.responsibleDescription
        }
      })
    }
  }, [buyerFromApi, modeView])

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      schemaConstructor={buyerSchema}
      defaultValues={INITIAL_VALUES}
      filterEmptyValues
    >
      {(loader || loading || existenceBuyerFromApiLoading) && (
        <CircularLoader />
      )}
      <Grid container spacing={2} className={classes.container}>
        <Grid item className={classes.header} sm={12}>
          <Typography className={classes.title} variant='h4' gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Lgpd
            formRef={formRef}
            modeView={
              modeView || loader || loading || existenceBuyerFromApiLoading
            }
            isEdit={isEdit}
            isView={modeView}
          ></Lgpd>
          <MainData
            formRef={formRef}
            isDisabled={
              modeView || loader || loading || existenceBuyerFromApiLoading
            }
            isEdit={isEdit}
            setCpf={setCpf}
            cpfAlreadyExists={existenceBuyerFromApi}
            search={debounceQuery}
            isView={modeView}
          />
          <Grid item xs={12} className={classes.flexContainer}>
            <Scope path='parentCompanyAddress'>
              <Address
                formRef={formRef}
                title={t('address of {this}', {
                  gender: '',
                  this: t('buyer', { howMany: 1 })
                })}
                isDisabled={modeView || isDisabled}
                stateOptions={stateOptions}
                objFather='parentCompanyAddress'
              />
            </Scope>
            <Scope path='buyerAddress'>
              <Address
                formRef={formRef}
                title={`${t('address')}  ${t('matrix', { howMany: 1 })}`}
                isDisabled={modeView || isDisabled}
                stateOptions={stateOptions}
                objFather='buyerAddress'
              />
            </Scope>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.buttons}>
          <Grid>
            {!modeView && (
              <I18n
                as={Button}
                variant='outlined'
                color='secondary'
                disabled={loader || loading || existenceBuyerFromApiLoading}
                onClick={handleCancel}
              >
                cancel
              </I18n>
            )}
          </Grid>
          <Grid>
            {!modeView && (
              <I18n
                as={Button}
                className={classes.resetBtn}
                disabled={loader || loading || existenceBuyerFromApiLoading}
                variant='text'
                color='secondary'
                onClick={handleReset}
              >
                clean
              </I18n>
            )}
            <Button
              color='secondary'
              variant='contained'
              className={classes.btnSave}
              isLoading={loader || loading || existenceBuyerFromApiLoading}
              onClick={() =>
                !modeView
                  ? formRef.current.submit()
                  : history.push(routes.buyers.path)
              }
            >
              {!modeView ? t('finish registration') : t('turn back')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}

export default BuyerListScreen
