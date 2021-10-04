import React, {
  useMemo,
  useCallback,
  useState,
  useEffect
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import find from 'lodash/find'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'
import Add from '@material-ui/icons/Add'

import I18n, { useT } from '@britania-crm/i18n'
import {
  linesMaster as lineMasterCrmRoutes,
  lines as linesCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Button from '@britania-crm/web-components/Button'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputSelect from '@britania-crm/web-components/InputSelect'
import Tooltip from '@britania-crm/web-components/Tooltip'

const LineFamilyBlock = ({
  disabled,
  formRef,
  parentCompany
}) => {
  const t = useT()
  const [linesFamilies, setLinesFamilies] = useState([])

  const [line, setLine] = useState('')
  const [family, setFamily] = useState([])
  const [lineMaster, setLineMaster] = useState('')

  const { data: linesMasterFromApi } = useCrmApi(lineMasterCrmRoutes.getAll)

  const { data: linesFromApi, loading: loadingLines } = useCrmApi(
    lineMaster ? [linesCrmRoutes.getAll, lineMaster] : null,
    { params: { lineMasterCode: lineMaster.toString() } }
  )

  const {
    data: familiesFromApi,
    loading: familiesFromApiLoading
  } = useCrmApi(
    (parentCompany?.parentCompanyCode && line) ? [linesCrmRoutes.getFamilies, parentCompany, line] : null,
    { params: { clientTotvsCode: parentCompany.parentCompanyCode, lines: line } }
  )

  const columns = useMemo(() => [
    {
      title: t('line', { howMany: 1 }),
      field: 'lineDescription'
    },
    {
      title: t('family', { howMany: 1 }),
      field: 'familyDescription',
      render (row) {
        if (row?.family) {
          const listFamilyString = map(row.family, ({ familyDescription }) => familyDescription)
          const shortListFamilyString = listFamilyString.slice(0, 4).join(', ')
          return (
            <div>
              <Tooltip title={ listFamilyString.join(', ') } arrow>
                {
                  listFamilyString.length > 4
                    ? shortListFamilyString.concat('...')
                    : shortListFamilyString
                }
              </Tooltip>
            </div>
          )
        }
        return ''
      }
    }
  ], [t])

  const addDisabled = useMemo(
    () => (
      !line ||
      !family
      // !!find(linesFamilies, { lineCode: line, familyCode: family })
    ),
    [family, line]
  )

  const handleLineMaster = useCallback(
    (value) => {
      setLineMaster(value)
      if (value) {
        formRef.current.setFieldValue('directorshipDescription',
          (find(linesMasterFromApi, { masterLineCode: value })?.masterLineDescription) || '')
      }
    },
    [formRef, linesMasterFromApi]
  )

  const handleAddLineFamily = useCallback(
    () => {
      const lineObj = find(linesFromApi, ({ lineCode }) => lineCode === line)
      const familyObj = map(family, (item) => {
        const families = find(familiesFromApi, ({ familyCode }) => familyCode === item)
        return {
          ...families,
          familyCode: Number(families?.familyCode)
        }
      })

      formRef.current.setFieldValue('linesFamilies', (old) => [
        ...old,
        {
          family: [...familyObj],
          ...lineObj
        }
      ])

      setFamily([])
      setLine('')
    },
    [family, familiesFromApi, formRef, line, linesFromApi]
  )

  const handleDeleteItem = useCallback(
    (_, row) => {
      formRef.current.setFieldValue('linesFamilies', (old) => filter(old, (item) => {
        if (row.lineCode === item.lineCode && row.familyCode === item.familyCode) {
          return false
        }
        return true
      }))
    },
    [formRef]
  )

  useEffect(
    () => {
      if (parentCompany) {
        setFamily([])
      }
    },
    [parentCompany]
  )

  return (
    <Grid
      container
      spacing={ 1 }
      style={ { marginBottom: 20, marginTop: 20 } }
    >
      <Grid item xs={ 12 } md={ 3 }>
        <InputSelect
          valueKey="masterLineDescription"
          idKey="masterLineCode"
          name="directorshipCode"
          label={ t('board of Directors') }
          options={ linesMasterFromApi }
          disabled={ disabled }
          onValueChange={ handleLineMaster }
        />
        <InputHidden name="directorshipDescription" />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputSelect
          detached
          required
          name="line"
          label={ t('line') }
          value={ line }
          onChange={ (e) => setLine(e.target.value) }
          valueKey="lineDescription"
          idKey="lineCode"
          options={ linesFromApi }
          loading={ loadingLines }
          disabled={ disabled || !linesFromApi }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputSelect
          detached
          required
          name="family"
          label={ t('family', { howMany: 1 }) }
          value={ family }
          onChange={ (e) => setFamily(e.target.value) }
          valueKey="familyDescription"
          idKey="familyCode"
          options={ familiesFromApi }
          loading={ familiesFromApiLoading }
          disabled={ disabled || !familiesFromApi }
          multiple
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 } style={ { justifyContent: 'flex-end' } }>
        <I18n
          as={ Button }
          startIcon={ <Add /> }
          variant="contained"
          color="primary"
          onClick={ handleAddLineFamily }
          disabled={ disabled || addDisabled }
        >
          datagrid body add tooltip
        </I18n>
      </Grid>
      <Grid item xs={ 12 }>
        <DataTable
          data={ linesFamilies }
          columns={ columns }
          onDeleteClick={ !disabled && handleDeleteItem }
          options={ { search: false } }
        />
        <InputHidden
          name="linesFamilies"
          onValueChange={ setLinesFamilies }
          showError
        />
      </Grid>
    </Grid>
  )
}

LineFamilyBlock.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any,
  parentCompany: PropTypes.object
}

LineFamilyBlock.defaultProps = {
  formRef: {},
  parentCompany: {}
}

export default LineFamilyBlock
