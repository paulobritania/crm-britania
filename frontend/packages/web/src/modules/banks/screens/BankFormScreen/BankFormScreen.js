import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useDialog } from '@britania-crm/dialog'
import bankSchema, {
  INITIAL_VALUES
} from '@britania-crm/forms/schemas/bank/bank.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { banks as banksCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { BankActions } from '@britania-crm/stores/bank'
import { yupResolver } from '@hookform/resolvers/yup'

import cpfCnpjMask from '@britania-crm/forms/masks/cpfCnpj.mask'
import Button from '@britania-crm/web-components/Button'
import { CircularLoader } from '@britania-crm/web-components/Loader'
import Input from '@britania-crm/web-components/Input'
import Select from '@britania-crm/web-components/Select'
import InputLabel from '@material-ui/core/InputLabel'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

import { FormProvider, useForm } from 'react-hook-form'

import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import { useStyles } from './styles'

const BankFormScreen = () => {
  const t = useT()
  const classes = useStyles()
  const { routes } = useRoutes()
  const dispatch = useCallback(useDispatch(), [])
  const history = useHistory()

  const defaultValues = {
    company: ''
  }

  const methods = useForm({ defaultValues: defaultValues })
  const { handleSubmit, reset, control, setValue, watch } = methods
  //   {
  //     resolver: yupResolver(bankSchema)
  //   }
  const onSubmit = (data) => console.log(data)

  const { state } = useLocation()
  const { createDialog } = useDialog()

  const [loader, setLoader] = useState(false)

  const mode = useMemo(() => state?.params?.mode, [state])
  const modeView = useMemo(() => mode === 'view', [mode])
  const isEdit = useMemo(() => mode === 'edit', [mode])

  const { data: bankFromApi, loading } = useCrmApi(
    state?.params?.id
      ? [`${banksCrmRoutes.getOne}/${state?.params?.id}`]
      : null,
    {},
    {
      revalidateOnFocus: false
    }
  )

  const title = useMemo(() => {
    switch (mode) {
      case 'edit':
        return `${t('bank', {
          howMany: 1
        })}  ${bankFromApi?.id || ''}`

      case 'view':
        return `${t('bank', {
          howMany: 1
        })}  ${bankFromApi?.id || ''}`

      default:
        return t('new {this}', {
          gender: 'male',
          this: t('bank', { howMany: 1 })
        })
    }
  }, [bankFromApi, mode, t])

  //   const handleSubmit = useCallback(
  //     (values) => {
  //       setLoader(true)

  //       const saveBank = () => {
  //         const payload = {
  //           ...values,
  //           companyCode: Number(values.companyCode),
  //           bankCode: Number(values.bankCode),
  //           agency: values.agency,
  //           account: values.account,
  //           note: values.note
  //         }

  //         if (isEdit) {
  //           dispatch(
  //             BankActions.editBank(
  //               state?.params?.id,
  //               payload,
  //               () => setLoader(false),
  //               () => setLoader(false)
  //             )
  //           )
  //         } else {
  //           dispatch(
  //             BankActions.saveBank(
  //               payload,
  //               () => setLoader(false),
  //               () => setLoader(false)
  //             )
  //           )
  //         }
  //       }

  //       saveBank()
  //     },
  //     [dispatch, isEdit, bankFromApi]
  //   )

  const handleCancel = useCallback(
    () =>
      createDialog({
        id: 'cancel-modal',
        Component: ConfirmModal,
        props: {
          onConfirm() {
            history.push(routes.banks.path)
          },
          text:
            mode === 'create'
              ? t('Do you want to cancel the registration?')
              : t('Do you want to cancel editing?')
        }
      }),
    [createDialog, history, mode, routes.banks.path, t]
  )

  //   useEffect(() => {
  //     if (!state?.params?.id && mode !== 'create')
  //       history.replace(routes.banks.path)
  //   }, [history, mode, routes, state])

  const setMask = (value) => {
    console.log('CNPJ ->> ', cpfCnpjMask(value, { mode: 'cnpj' }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {(loader || loading) && <CircularLoader />}
      <Grid container spacing={2} className={classes.container}>
        <Grid item sm={6}>
          <Grid item className={classes.header} sm={12}>
            <Typography className={classes.title} variant='h4' gutterBottom>
              Dados Principais
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Select
              name='company'
              control={control}
              label='Nome da Empresa'
              valueKey='companyDescription'
              idKey='companyCode'
              id='select-company'
              placeholder='Empresa'
              loading={false}
              required
              options={[
                { companyCode: 1, companyDescription: 'empresa1' },
                { companyCode: 2, companyDescription: 'empresa2' }
              ]}
            />
          </Grid>
          <Grid item sm={12}>
            <Input
              name='cnpj'
              control={control}
              label='CNPJ'
              defaultValue=''
              mode='cnpj'
              placeholder='00.000.000/0000-00'
              mask={true}
            />
          </Grid>

          <Grid container>
            <Grid item sm={6}>
              <InputLabel>CEP</InputLabel>
            </Grid>
            <Grid item sm={6}>
              <InputLabel>Endereço</InputLabel>
            </Grid>
            <Grid item sm={6}>
              <InputLabel>Número</InputLabel>
            </Grid>
            <Grid item sm={6}>
              <InputLabel>Complemento (opcional)</InputLabel>
            </Grid>
            <Grid item sm={4}>
              <InputLabel>Bairro</InputLabel>
            </Grid>
            <Grid item sm={4}>
              <InputLabel>Cidade</InputLabel>
            </Grid>
            <Grid item sm={4}>
              <InputLabel>UF</InputLabel>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <Grid item sm={12}>
            <Typography className={classes.title} variant='h4' gutterBottom>
              Dados Bancários
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Select
              name='bank'
              control={control}
              label='Banco'
              valueKey='bankDescription'
              idKey='bankCode'
              id='select-bank'
              placeholder='Banco'
              loading={false}
              required
              options={[
                { bankCode: 1, bankDescription: 'empresa1' },
                { bankCode: 2, bankDescription: 'empresa2' }
              ]}
            />
          </Grid>
          <Grid container>
            <Grid item sm={6}>
              <Input
                name='agency'
                defaultValue=''
                placeholder='0000'
                label='Agência'
                control={control}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                name='account'
                defaultValue=''
                placeholder='00000000000-0'
                label='Conta'
                control={control}
              />
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Input
              name='note'
              defaultValue=''
              label='Observações'
              control={control}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.buttons}>
          <Grid>
            {!modeView && (
              <I18n
                as={Button}
                variant='outlined'
                color='secondary'
                disabled={loader || loading}
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
                disabled={loader || loading}
                variant='text'
                color='secondary'
                // onClick={handleReset}
              >
                clean
              </I18n>
            )}
            <Button
              type='submit'
              color='secondary'
              variant='contained'
              className={classes.btnSave}
              isLoading={loader || loading}
            >
              {!modeView ? t('finish registration') : t('turn back')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default BankFormScreen
