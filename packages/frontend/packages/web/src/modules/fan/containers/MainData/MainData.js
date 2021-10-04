import React, {
  useMemo,
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import remove from 'lodash/remove'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import { useT } from '@britania-crm/i18n'
import {
  representative as representativeRoutes,
  clients as clientsCrmRoutes,
  customer as customerCrmRoutes,
  lines as linesCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useSnackbar } from '@britania-crm/snackbar'
import { getErrorMessage } from '@britania-crm/utils/error'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputSelect from '@britania-crm/web-components/InputSelect'
import StatusSwitch from '@britania-crm/web-components/StatusSwitch'

import useStyles from './styles'

const MainData = ({
  isDisabled,
  formRef,
  lineMasterOptions,
  isEdit
}) => {
  const t = useT()
  const classes = useStyles()
  const snackbar = useSnackbar()

  const [lineMaster, setLineMaster] = useState('')
  const [lines, setLines] = useState('')
  const [familiesOptions, setFamiliesOptions] = useState([])

  const [code, setCode] = useState('')

  const { data: linesFromApi, loading: loadingLines } = useCrmApi(
    lineMaster ? [linesCrmRoutes.getAll, lineMaster] : null,
    { params: { lineMasterCode: lineMaster } }
  )

  const familiesParams = useMemo(
    () => {
      if (!isEmpty(lines)) {
        return { clientTotvsCode: code, lines: lines.toString() }
      }
    },
    [code, lines]
  )

  const { data: familiesFromApi, loading: familiesFromApiLoading } = useCrmApi(
    familiesParams ? [linesCrmRoutes.getFamilies, familiesParams] : null,
    { params: familiesParams },
    {
      onErrorRetry (error) {
        if (error.response.status === 500) {
          snackbar.error(getErrorMessage(error))
        }
      },
      revalidateOnFocus: false
    }
  )

  const regionalParams = useMemo(
    () => {
      if (!isEmpty(lines)) {
        return {
          page: 1,
          pageSize: 10,
          lineCodes: lines
        }
      }
      return {}
    }
    , [lines])

  const { data: regionalFromApi, loading: regionalFromApiLoading } = useCrmApi(
    code ? [customerCrmRoutes.getRegional.replace(':clientCode', code), regionalParams] : null,
    { params: regionalParams },
    {
      onErrorRetry (error) {
        if (error.response.status === 500) {
          snackbar.error(getErrorMessage(error))
        }
      },
      revalidateOnFocus: false
    }
  )

  const COMPANY = useMemo(
    () =>
      [{ id: 'BRITÂNIA ELETRODOMÉSTICOS S/A', name: 'BRITÂNIA ELETRODOMÉSTICOS S/A' },
        { id: 'BRITÂNIA ELETRÔNICOS S/A', name: 'BRITÂNIA ELETRÔNICOS S/A' },
        { id: 'PHILCO ELETRÔNICOS S/A', name: 'PHILCO ELETRÔNICOS S/A' },
        { id: 'TODAS AS EMPRESAS DO GRUPO', name: 'TODAS AS EMPRESAS DO GRUPO' }
      ]
    , [])

  const respresentativeParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10
    }),
    []
  )

  const clientParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      clientRegistrationType: 'REGISTER'
    }),
    []
  )

  const setNameMatrix = useCallback(
    (value) =>
      formRef.current.setFieldValue('fan.matrix', value)
    ,
    [formRef]
  )

  const setCodeMatrix = useCallback(
    (value) => {
      formRef.current.setFieldValue('fan.code', value)
      setCode(value?.parentCompanyCode)
    },
    [formRef]
  )

  const handleLineMaster = useCallback(
    (value) => {
      setLineMaster(value)
      setFamiliesOptions([])
      formRef.current.setData(
        (old) => ({
          ...old,
          fan: {
            ...old.fan,
            lines: [],
            linesFromBack: [],
            linesExceptions: [],
            families: [],
            familiesExceptions: [],
            familiesFromBack: [],
            familiesExceptionsFromBack: []
          }
        }))
    },
    [formRef]
  )

  const handleLines = useCallback(
    (values) => {
      if (isEmpty(values)) {
        setFamiliesOptions([])
        formRef.current.setData(
          (old) => ({
            ...old,
            fan: {
              ...old.fan,
              families: [],
              familiesExceptions: [],
              familiesFromBack: [],
              familiesExceptionsFromBack: []
            }
          }))
      } else {
        setLines(values)
        formRef.current.setFieldValue('fan.linesFromBack',
          map(values, (item) => {
            const newArray = find(linesFromApi, (option) => option.lineCode === item)
            return { code: newArray?.lineCode, description: newArray?.lineDescription }
          })
        )
      }
    },
    [formRef, linesFromApi]
  )

  const handleFamilies = useCallback(
    (values) => {
      if (!isEmpty(values)) {
        formRef.current.setFieldValue('fan.familiesFromBack',
          remove(
            map(values, (item) => {
              const newArray = find(familiesOptions, (option) => option.familyCode === item)
              return { code: newArray?.familyCode, description: newArray?.familyDescription }
            }),
            (s) => isEqual(s, {})
          )
        )
      }
    },
    [familiesOptions, formRef]
  )

  const handleLinesExceptions = useCallback(
    (values) => {
      if (!isEmpty(values)) {
        formRef.current.setFieldValue('fan.linesExceptionsFromBack',
          map(values, (item) => {
            const newArray = find(linesFromApi, (option) => option.lineCode === item)
            return { code: newArray?.lineCode, description: newArray?.lineDescription }
          })
        )
      }
    },
    [formRef, linesFromApi]
  )

  const handleFamiliesExceptions = useCallback(
    (values) => {
      if (!isEmpty(values)) {
        formRef.current.setFieldValue('fan.familiesExceptionsFromBack',
          map(values, (item) => {
            const newArray = find(familiesOptions, (option) => option.familyCode === item)
            return { code: newArray?.familyCode, description: newArray?.familyDescription }
          })
        )
      }
    },
    [familiesOptions, formRef]
  )

  useFormEffect(() => {
    if (!isEmpty(familiesFromApi)) {
      setFamiliesOptions(
        (old) => {
          if (lines.length > 1) {
            return [...old, ...familiesFromApi]
          } else {
            return familiesFromApi
          }
        })
    }
  }, [familiesFromApi, formRef, isDisabled, lines])

  return (
    <Grid container spacing={ 1 } className={ classes.container }>
      <Grid item sm={ 12 } md={ 4 } >
        <InputSelect
          valueKey="name"
          idKey="id"
          name="company"
          label={ t('company') }
          required
          options={ COMPANY }
          disabled={ isDisabled }
        />
      </Grid>
      <Grid item sm={ 12 } md={ 4 } >
        <InputAutocomplete
          url={ clientsCrmRoutes.get }
          params={ clientParams }
          valueKey="parentCompanyCode"
          paramName="parentCompanyCode"
          name="code"
          label={ t('matrix code', { abbreviation: false }) }
          disabled={ isDisabled }
          onValueChange={ setNameMatrix }
        />
      </Grid>
      <Grid item sm={ 12 } md={ 4 } >
        <InputAutocomplete
          url={ clientsCrmRoutes.get }
          params={ clientParams }
          valueKey="parentCompany"
          paramName="parentCompany"
          name="matrix"
          label={ t('matrix', { howMany: 1 }) }
          disabled={ isDisabled }
          onValueChange={ setCodeMatrix }
        />
      </Grid>
      <Grid item sm={ 12 } md={ 4 } >
        <InputAutocomplete
          url={ representativeRoutes.getRepresentativeList }
          params={ respresentativeParams }
          valueKey="name"
          paramName="name"
          name="responsible"
          label={ t('responsible', { howMany: 1 }) }
          disabled={ isDisabled }
        />
      </Grid>
      <Grid item sm={ 12 } md={ 8 } >
        <InputAutocomplete
          options={ regionalFromApi }
          loading={ regionalFromApiLoading }
          valueKey="approverDescription"
          paramName="approverCode"
          name="regionalManager"
          label={ t('regional manager') }
          disabled={ isDisabled }
          infoDescription={ t('more than one regional manager can be included.') }
        />
      </Grid>
      <Grid item sm={ 12 } md={ 6 } >
        <InputDateRange
          labelTo={ t('end date') }
          labelFrom={ t('start date') }
          name="date"
          disabled={ isDisabled }
        />
      </Grid>
      <Grid item sm={ 12 } md={ 4 } >
        <InputSelect
          valueKey="masterLineDescription"
          idKey="masterLineCode"
          name="directorship"
          label={ t('board of Directors') }
          options={ lineMasterOptions }
          disabled={ isDisabled }
          onValueChange={ handleLineMaster }
        />
      </Grid>
      {isEdit && (
        <Grid item sm={ 12 } md={ 2 } className={ classes.status }>
          <StatusSwitch
            name="active"
            disabled={ isDisabled }
          />
        </Grid>)}
      <Grid item sm={ 12 } md={ 6 } >
        <InputSelect
          valueKey="lineDescription"
          idKey="lineCode"
          name="lines"
          label={ t('line', { howMany: 1 }) }
          options={ linesFromApi }
          disabled={ isDisabled || !lineMaster }
          loading={ loadingLines }
          onValueChange={ handleLines }
          multiple
        />
        <InputHidden name="linesFromBack" />
      </Grid>
      <Grid item sm={ 12 } md={ 6 }>
        <InputSelect
          valueKey="familyDescription"
          idKey="familyCode"
          disabled={ isDisabled || isEmpty(lines) }
          name="families"
          label={ t('family', { howMany: 1 }) }
          options={ familiesOptions }
          loading={ familiesFromApiLoading }
          onValueChange={ handleFamilies }
          multiple
        />
        <InputHidden name="familiesFromBack" />
      </Grid>

      <Grid item sm={ 12 } md={ 6 } >
        <InputSelect
          valueKey="lineDescription"
          idKey="lineCode"
          name="linesExceptions"
          label={ t('exception line', { howMany: 1 }) }
          options={ linesFromApi }
          disabled={ isDisabled || isEmpty(linesFromApi) }
          loading={ loadingLines }
          multiple
          onValueChange={ handleLinesExceptions }
        />
        <InputHidden name="linesExceptionsFromBack" />
      </Grid>
      <Grid item sm={ 12 } md={ 6 }>
        <InputSelect
          valueKey="familyDescription"
          idKey="familyCode"
          disabled={ isDisabled || isEmpty(familiesOptions) }
          name="familiesExceptions"
          label={ t('exception family', { howMany: 1 }) }
          options={ familiesOptions }
          loading={ familiesFromApiLoading }
          multiple
          onValueChange={ handleFamiliesExceptions }
        />
        <InputHidden name="familiesExceptionsFromBack" />
      </Grid>
    </Grid>
  )
}

MainData.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  lineMasterOptions: PropTypes.array.isRequired,
  isEdit: PropTypes.bool.isRequired
}

export default MainData
