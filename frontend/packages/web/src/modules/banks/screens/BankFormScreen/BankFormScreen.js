import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { isEmpty } from 'lodash'
import api from '../../../../../../core/services/apis/crmApi/api'

import { useDialog } from '@britania-crm/dialog'
import bankSchema, {
  INITIAL_VALUES
} from '@britania-crm/forms/schemas/bank/bank.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  establishments,
  banks as banksCrmRoutes,
  banks
} from '@britania-crm/services/apis/crmApi/resources/routes'

import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { BankActions } from '@britania-crm/stores/bank'
import { yupResolver } from '@hookform/resolvers/yup'

import cpfCnpjMask from '@britania-crm/forms/masks/cpfCnpj.mask'
import Button from '@britania-crm/web-components/Button'
import { CircularLoader } from '@britania-crm/web-components/Loader'
import Input from '@britania-crm/web-components/Input'
import Select from '@britania-crm/web-components/Select'
import Autocomplete from '@britania-crm/web-components/Autocomplete'
import InputLabel from '@material-ui/core/InputLabel'
import Divider from '@material-ui/core/Divider'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

import { FormProvider, useForm } from 'react-hook-form'

import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import { useStyles, InputLabelStyled } from './styles'

const BankFormScreen = () => {
  const t = useT()
  const classes = useStyles()
  const { routes } = useRoutes()
  const dispatch = useCallback(useDispatch(), [])
  const history = useHistory()
  const [company, setCompany] = useState({})

  const defaultValues = {
    companyId: 0,
    bankCode: '',
    agency: '',
    account: '',
    note: ''
  }

  const methods = useForm({
    defaultValues: defaultValues
    // resolver: yupResolver(bankSchema)
  })
  const { handleSubmit, reset, control, setValue, getValues } = methods

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

  const { data: listCompaniesFromApi, loading: listCompaniesLoading } =
    useCrmApi(
      true ? establishments.getAll : null,
      {
        params: {
          page: 1,
          pageSize: 10
        }
      },
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

  const onSubmit = useCallback(
    (values) => {
      setLoader(true)

      const saveBank = () => {
        const payload = {
          ...values,
          companyId: Number(values.companyId),
          bankCode: values.bankCode.code,
          agency: values.agency,
          account: values.account,
          note: values.note
        }

        if (isEdit) {
          dispatch(
            BankActions.editBank(
              state?.params?.id,
              payload,
              () => {
                setLoader(false)
                history.push(routes.banks.path)
              },
              () => setLoader(false)
            )
          )
        } else {
          dispatch(
            BankActions.saveBank(
              payload,
              () => {
                setLoader(false)
                history.push(routes.banks.path)
              },
              () => setLoader(false)
            )
          )
        }
      }

      saveBank()
    },
    [dispatch, isEdit, bankFromApi]
  )

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

  const handleChange = async (e) => {
    const res = await api.get(
      `${establishments.getOne}/${e.target.value}`,
      null
    )

    setCompany(res.data)
    setValue('companyId', e.target.value)
    setValue('cnpj', res.data.cnpj)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {(loader || loading) && <CircularLoader />}

      <Grid container spacing={2} className={classes.container}>
        <Grid item className={classes.header} sm={12}>
          <Typography className={classes.title} variant='h4' gutterBottom>
            Novo Cadastro de Dados Bancários
          </Typography>
        </Grid>
        <Divider variant='fullWidth' className={classes.dividerTop} />
        <Grid item sm={6}>
          <Grid item className={classes.header} sm={12}>
            <Typography className={classes.title} variant='h4' gutterBottom>
              Dados Principais
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Select
              name='companyId'
              control={control}
              label={t('company name')}
              valueKey='establishmentDescription'
              idKey='establishmentCode'
              id='select-company'
              placeholder='Empresa'
              loading={listCompaniesLoading}
              required
              options={listCompaniesFromApi}
              customChange={handleChange}
            />
          </Grid>
          <Grid item sm={12}>
            <Input
              name='cnpj'
              control={control}
              label={t('cnpj')}
              defaultValue=''
              mode='cnpj'
              placeholder='00.000.000/0000-00'
              mask={true}
              readonly
            />
          </Grid>
          <Grid container spacing={4} style={{ marginTop: 10 }}>
            <Grid item sm={6}>
              <InputLabelStyled>CEP</InputLabelStyled>
              <InputLabelStyled>{company.cep ?? ''}</InputLabelStyled>
            </Grid>
            <Grid item sm={6}>
              <InputLabelStyled>Endereço</InputLabelStyled>
              <InputLabelStyled>{company.endereco ?? ''}</InputLabelStyled>
            </Grid>
            <Grid item sm={6}>
              <InputLabelStyled>Número</InputLabelStyled>
              <InputLabelStyled>{company.numero ?? ''}</InputLabelStyled>
            </Grid>
            <Grid item sm={6}>
              <InputLabelStyled>Complemento (opcional)</InputLabelStyled>
              <InputLabelStyled>{company.complemento ?? ''}</InputLabelStyled>
            </Grid>
            <Grid item sm={4}>
              <InputLabelStyled>Bairro</InputLabelStyled>
              <InputLabelStyled>{company.bairro ?? ''}</InputLabelStyled>
            </Grid>
            <Grid item sm={4}>
              <InputLabelStyled>Cidade</InputLabelStyled>
              <InputLabelStyled>{company.cidade ?? ''}</InputLabelStyled>
            </Grid>
            <Grid item sm={4}>
              <InputLabelStyled>UF</InputLabelStyled>
              <InputLabelStyled>{company.estado ?? ''}</InputLabelStyled>
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
            <Autocomplete
              control={control}
              url={banks.getAll}
              params={{
                page: 1,
                pageSize: 10
              }}
              valueKey='description'
              paramName='description'
              name='bankCode'
              label={t('bank')}
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item sm={6}>
              <Input
                name='agency'
                defaultValue=''
                placeholder='0000'
                label={t('agency', { howMany: 1 })}
                control={control}
                maxLenght={4}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                name='account'
                defaultValue=''
                placeholder='00000000000-0'
                label={t('account', { howMany: 1 })}
                control={control}
                maxLenght={13}
              />
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Input
              name='note'
              defaultValue=''
              label={t('observation', { howMany: 2 })}
              control={control}
              multiline
              rows={5}
              maxLenght={240}
            />
            <InputLabel style={{ float: 'right', fontSize: 12 }}>
              Max. 240 caracteres
            </InputLabel>
          </Grid>
        </Grid>
        <Divider variant='fullWidth' className={classes.dividerBottom} />
        <Grid container className={classes.buttons}>
          <Grid>
            {!modeView && (
              <I18n
                as={Button}
                variant='text'
                color='secondary'
                disabled={loader || loading}
                onClick={handleCancel}
              >
                cancelRegister
              </I18n>
            )}
          </Grid>
          <Grid>
            {!modeView && (
              <I18n
                as={Button}
                className={classes.resetBtn}
                disabled={loader || loading}
                variant='outlined'
                color='secondary'
                onClick={() => reset()}
              >
                cleanForm
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
