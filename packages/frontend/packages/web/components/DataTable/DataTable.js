import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'

import { useT } from '@meta-react/i18n'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import uuid from 'short-uuid'

import filter from 'lodash/filter'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import map from 'lodash/map'
import omitBy from 'lodash/omitBy'
import upperCase from 'lodash/upperCase'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ThemeProvider } from '@material-ui/core/styles'

import crmApi from '@britania-crm/services/apis/crmApi'
import colors from '@britania-crm/styles/colors'
import Popover from '@britania-crm/web-components/Popover'

import Header from './components/Header'
import HeaderToolbar from './components/HeaderToolbar'
import Pagination from './components/Pagination'
import Table from './components/Table'
import datagridI18 from './i18n'
import icons from './icons'
import MTableOptions from './options'
import useStyles, {
  createTheme,
  ButtonFilterData,
  ButtonAddNew,
  PopoverItem
} from './styles'

const DataTable = forwardRef((props, ref) => {
  const {
    api,
    data,
    pageSize,
    params,
    urlParams,
    queryParams,
    columns: propColumns,
    options: propOptions,
    shadow,
    title,
    titleProps,
    onFilterClick,
    addFilterTitle,
    onAddClick,
    addTitle,
    addTooltip,
    onEditClick,
    onDeleteClick,
    conditionToEdit,
    conditionToDelete,
    onExportClick,
    onRowClick,
    loading,
    disabled,
    disabledRow,
    onSelectionChange,
    tableBodyClassName,
    tableHeaderClassName,
    components: propComponents,
    emptyMessage,
    actions: propActions,
    searchPlaceholder,
    onGoBack,
    style: propStyle,
    filters,
    backgroundColor,
    dividerColor,
    searchFieldAlignment,
    minimalistToolbar,
    onDownloadClick,
    conditionToDownload,
    onRedirectClick,
    conditionToRedirect,
    addMicroActions,
    onBindClick,
    conditionToBind,
    disableRowClick,
    ...rest
  } = props

  const t = useT()
  const classes = useStyles()

  const mounted = useRef(false)
  const configs = useRef({})

  const tableRef = useRef(null)

  const [filteredRows, setFilteredRows] = useState([])

  const tableId = useMemo(() => uuid().new(), [])

  const i18n = useMemo(
    () => {
      const translations = datagridI18(t)
      return {
        ...(translations || {}),
        body: {
          ...get(translations, 'body', {}),
          emptyDataSourceMessage: emptyMessage || get(translations, 'body.emptyDataSourceMessage')
        }
      }
    },
    [t, emptyMessage]
  )

  const options = useMemo(
    () => ({
      selectionProps (row) {
        const rowDisabled = disabledRow(row)
        const response = {
          // color: 'primary',
          disabled: rowDisabled
        }
        if (rowDisabled) {
          response.checked = false
        }
        return response
      },
      ...MTableOptions,
      ...propOptions,
      showTitle: !isEmpty(title),
      pageSize,
      paging: isString(data) ? true : (isBoolean(MTableOptions?.paging) ? MTableOptions.paging : propOptions.paging),
      headerStyle: {
        ...get(MTableOptions, 'headerStyle', {}),
        ...get(propOptions, 'headerStyle', {})
      },
      searchFieldProps: {
        ...get(MTableOptions, 'searchFieldProps', {}),
        ...get(propOptions, 'searchFieldProps', {}),
        classes: {
          root: classes.searchField,
          ...get(MTableOptions, 'searchFieldProps.classes', {}),
          ...get(propOptions, 'searchFieldProps.classes', {})
        },
        InputProps: { endAdornment: null }
      }
    }),
    [classes.searchField, data, disabledRow, pageSize, propOptions, title]
  )

  const columns = useMemo(
    () => map(propColumns, (column) => {
      const { cellStyle = {} } = column

      let columnStyle = cellStyle
      if (!isFunction(cellStyle)) {
        columnStyle = () => cellStyle
      }

      return {
        emptyValue: column.render ? undefined : '-',
        ...column,
        cellStyle (_, rowData) {
          let rowStyle = {
            ...(options.rowStyle || {}),
            ...((isFunction(propOptions.rowStyle) ? propOptions.rowStyle(_, rowData) : propOptions.rowStyle) || {}),
            ...((isFunction(column.cellStyle) ? column.cellStyle(_, rowData) : column.cellStyle) || {})
          }
          if (disabledRow(rowData)) {
            rowStyle = {
              opacity: 0.7,
              ...rowStyle
            }
          }
          return {
            ...columnStyle(_, rowData),
            ...rowStyle
          }
        }
      }
    }),
    [disabledRow, options.rowStyle, propColumns, propOptions]
  )

  const FilterButton = useMemo(
    () => onFilterClick && (
      <ButtonFilterData
        id={ `filter-${ tableId }` }
        color="primary"
        onClick={ onFilterClick }
        size="small"
        startIcon={ <icons.FilterIcon color={ colors.primary.main } /> }
        variant="outlined"
        disabled={ loading || disabled }
      >
        {addFilterTitle}
      </ButtonFilterData>
    ),
    [addFilterTitle, disabled, loading, onFilterClick, tableId]
  )

  const AddButton = useMemo(
    () => onAddClick && (
      <ButtonAddNew
        id={ `new-${ tableId }` }
        color="warning"
        onClick={ onAddClick }
        size="small"
        startIcon={ <icons.Add /> }
        variant="outlined"
        disabled={ loading || disabled }
      >
        {addTitle}
      </ButtonAddNew>
    ),
    [addTitle, disabled, loading, onAddClick, tableId]
  )

  const actions = useMemo(
    () => {
      let newActions = []

      if (onDeleteClick) {
        const DeleteIcon = icons.Delete
        newActions = [
          (row) => {
            const canDelete = conditionToDelete(row)
            return {
              icon: DeleteIcon,
              tooltip: t('datagrid body delete tooltip'),
              hidden: !canDelete,
              onClick: onDeleteClick,
              disabled: loading || disabled || !canDelete,
              iconButtonProps: {
                size: 'small',
                color: 'default'
              },
              position: 'row'
            }
          },
          ...newActions
        ]
      }

      if (onDownloadClick) {
        const DownloadIcon = icons.Download
        newActions = [
          (row) => {
            const canDownload = conditionToDownload(row)
            return {
              icon: DownloadIcon,
              tooltip: t('datagrid body dowload tooltip'),
              hidden: !canDownload,
              onClick: onDownloadClick,
              disabled: loading || disabled || !canDownload,
              iconButtonProps: {
                size: 'small',
                color: 'default'
              },
              position: 'row'
            }
          },
          ...newActions
        ]
      }

      if (onRedirectClick) {
        const RedirectIcon = icons.Redirect
        newActions = [
          (row) => {
            const canRedirect = conditionToRedirect(row)
            return {
              icon: RedirectIcon,
              tooltip: t('datagrid body redirect tooltip'),
              hidden: !canRedirect,
              onClick: onRedirectClick,
              disabled: loading || disabled || !canRedirect,
              iconButtonProps: {
                size: 'small',
                color: 'default'
              },
              position: 'row'
            }
          },
          ...newActions
        ]
      }

      if (onEditClick) {
        const EditIcon = icons.Edit
        newActions = [
          (row) => {
            const canEdit = conditionToEdit(row)
            return {
              icon: EditIcon,
              tooltip: t('datagrid body edit tooltip'),
              hidden: !canEdit,
              onClick: onEditClick,
              disabled: loading || disabled || !canEdit,
              iconButtonProps: {
                size: 'small',
                color: 'default'
              },
              position: 'row'
            }
          },
          ...newActions
        ]
      }

      if (!isEmpty(addMicroActions)) {
        newActions = [
          ...newActions,
          (row) => ({
            icon: () => (
              <Popover
                style={ { width: '100%' } }
                popoverId={ `microactions-${ tableId }-${ row.id }` }
                Component={ ({ popupState, ...iconProps }) => (
                  <icons.Menu
                    { ...iconProps }
                    style={ {
                      ...(iconProps.style || {}),
                      color: popupState.isOpen ? colors.white : colors.secondary.main,
                      backgroundColor: popupState.isOpen ? colors.secondary.main : 'transparent',

                      borderRadius: '50%',
                      fontSize: 20

                    } }
                  />
                ) }
                popoverStyle={ {
                  maxWidth: 250,
                  zIndex: 9999
                } }
              >
                <>
                  {map(addMicroActions, (option) => (
                    <PopoverItem
                      key={ option.title }
                      onClick={ () => option.action(row) }
                    >
                      { option.title }
                    </PopoverItem>
                  ))}
                </>
              </Popover>
            ),
            isFreeAction: false,
            iconProps: { size: 10 },
            iconButtonProps: {
              style: {
                width: 20,
                height: 20,
                border: `2px solid ${ colors.secondary.main }`
                // padding: 0
              },
              position: 'row'
            }
          })
        ]
      }

      if (onBindClick) {
        const BindIcon = icons.LinkIcon
        newActions = [
          (row) => {
            const canBind = conditionToBind(row)
            return {
              icon: BindIcon,
              tooltip: t('datagrid body bind tooltip'),
              onClick: onBindClick,
              disabled: loading || disabled || !canBind,
              iconButtonProps: {
                size: 'small',
                color: 'default'
              },
              position: 'row'
            }
          },
          ...newActions
        ]
      }

      if (onRowClick) {
        newActions = [
          {
            icon: icons.AccessRow,
            tooltip: t('datagrid body access tooltip'),
            onClick: onRowClick,
            disabled: loading || disabled,
            iconButtonProps: {
              size: 'small',
              color: 'default'
            },
            position: 'row'
          },
          ...newActions
        ]
      }

      return map(
        [...propActions, ...newActions],
        (action) => {
          if (isFunction(action)) return action
          return {
            ...action,
            onClick: action.position === 'toolbarOnSelect'
              ? () => action.onClick(filteredRows)
              : action.onClick
          }
        }
      )
    },
    [addMicroActions, conditionToBind, conditionToDelete, conditionToDownload, conditionToEdit, conditionToRedirect, disabled, filteredRows, loading, onBindClick, onDeleteClick, onDownloadClick, onEditClick, onRowClick, propActions, onRedirectClick, t, tableId]
  )

  const enableToolbar = useMemo(
    () => !!(
      options.search ||
      title ||
      AddButton ||
      FilterButton ||
      onExportClick ||
      onGoBack
    ),
    [AddButton, FilterButton, onExportClick, onGoBack, options.search, title]
  )

  const style = useMemo(
    () => ({
      ...propStyle,
      ...(!shadow ? { boxShadow: 'none' } : {})
    }),
    [propStyle, shadow]
  )

  const handleSelectionChange = useCallback(
    (rows) => {
      const newFilteredRows = filter(rows, (row) => !disabledRow(row))
      onSelectionChange(newFilteredRows)
      setFilteredRows(newFilteredRows)
    },
    [disabledRow, onSelectionChange]
  )

  const asyncData = useCallback(
    async (query) => {
      try {
        // const filters = get(query, 'filters')
        const searchTerm = get(query, 'search')
        const size = get(query, 'pageSize', pageSize)
        const orderBy = get(query, 'orderBy.field')
        const orderDirection = get(query, 'orderDirection')
        let page = get(query, 'page', 0)

        const currentConfigs = {
          size,
          searchTerm,
          orderBy,
          orderDirection
        }

        if (!isEqual(currentConfigs, configs.current)) {
          page = 0 // if has changes, return to first page
        }

        configs.current = { ...currentConfigs }

        let requestQueryParams = {
          page: page + 1,
          pageSize: size
        }

        if (!isEmpty(orderBy)) {
          requestQueryParams = {
            ...requestQueryParams,
            orderBy,
            sort: upperCase(orderDirection)
          }
        }
        if (!isEmpty(searchTerm)) {
          requestQueryParams = {
            ...requestQueryParams,
            q: searchTerm
          }
        }
        if (!isEmpty(queryParams)) {
          requestQueryParams = {
            ...requestQueryParams,
            ...omitBy(queryParams, (param) => !isBoolean(param) && param !== 0 && isEmpty(param))
          }
        }

        const {
          data: {
            data: datagridData,
            totalRegisters
          }
        } = await api.get(data, {
          params: {
            ...params,
            ...filters,
            ...requestQueryParams
          }
        })

        return {
          data: datagridData,
          page,
          totalCount: totalRegisters || 0
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(i18n.fetchLoadError, e)
        throw e
      }
    },
    [api, data, filters, i18n.fetchLoadError, pageSize, params, queryParams]
  )

  const realData = useMemo(
    () => isString(data) ? asyncData : data,
    [asyncData, data]
  )

  const components = useMemo(
    () => ({
      Header: (headerProps) => (
        <Header
          { ...headerProps }
          tableHeaderClassName={ tableHeaderClassName }
        />
      ),
      Toolbar: (toolbarProps) => enableToolbar && (
        <HeaderToolbar
          { ...toolbarProps }
          id={ tableId }
          searchFieldAlignment={ searchFieldAlignment }
          titleProps={ titleProps }
          FilterButton={ FilterButton }
          AddButton={ AddButton }
          searchPlaceholder={ searchPlaceholder }
          onGoBack={ onGoBack }
          exportCsv={ onExportClick }
          minimalistToolbar={ minimalistToolbar }
        />
      ),
      Table,
      Pagination,
      ...propComponents
    }),
    [AddButton, FilterButton, enableToolbar, minimalistToolbar, onExportClick, onGoBack, propComponents, searchFieldAlignment, searchPlaceholder, tableHeaderClassName, tableId, titleProps]
  )

  useEffect(
    // didUpdate
    () => {
      if (mounted.current && tableRef && isString(data)) {
        tableRef.current.onQueryChange()
      }
    },
    [data, urlParams, queryParams, tableRef, asyncData]
  )

  useEffect(
    () => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    },
    []
  )

  useImperativeHandle(ref, () => tableRef.current)

  return (
    <ThemeProvider theme={ createTheme({ dividerColor, backgroundColor }) }>
      <Card style={ style }>
        <CardContent>
          <MaterialTable
            { ...rest }
            tableRef={ tableRef }
            id={ tableId }
            icons={ icons }
            options={ options }
            columns={ columns }
            data={ realData }
            localization={ i18n }
            onRowClick={ !disableRowClick ? onRowClick : undefined }
            title={ title }
            actions={ actions }
            style={ { boxShadow: 'none' } }
            isLoading={ isString(data) ? undefined : loading }
            components={ components }
            onSelectionChange={ handleSelectionChange }
          />
        </CardContent>
      </Card>
    </ThemeProvider>

  )
})

DataTable.propTypes = {
  /** columns by material-table */
  columns: PropTypes.array.isRequired,
  /** actions by material-table */
  actions: PropTypes.array,
  /** data by material-table */
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  /** options by material-table */
  options: PropTypes.object,
  /** params to inject into request */
  params: PropTypes.object,
  /** pageSize by material-table */
  pageSize: PropTypes.number,
  /** remove shadow of the datagrid container */
  shadow: PropTypes.bool,
  /** title by material-table */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** set style props to table title */
  titleProps: PropTypes.object,
  /* Enable Add button, and set the callback called when this button is clicked */
  onAddClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /* Enable Filter button, and set the callback called when this button is clicked */
  onFilterClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** tooltip for add button */
  addTooltip: PropTypes.string,
  /** title for filter button */
  addFilterTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** title for add button */
  addTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onSelectionChange: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** Enable Edit button, and set the callback called when this button is clicked */
  onEditClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** Enable redirect button, and set the callback called when this button is clicked */
  onRedirectClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** Enable Delete button, and set the callback called when this button is clicked */
  onDeleteClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** Enable Download button, and set the callback called when this button is clicked */
  onDownloadClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** Enable Bind button, and set the callback called when this button is clicked */
  onBindClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** Enable Export button, and set the callback called when this button is clicked */
  onExportClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** Enable Row click */
  onRowClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  /** datagrid is loading */
  loading: PropTypes.bool,
  /** disable all actions */
  disabled: PropTypes.bool,
  /** customize row when row was softdeleted */
  disabledRow: PropTypes.func,
  /** customize row when row was softdeleted */
  emptyMessage: PropTypes.string,
  urlParams: PropTypes.object,
  queryParams: PropTypes.object,
  tableBodyClassName: PropTypes.string,
  tableHeaderClassName: PropTypes.string,
  components: PropTypes.object,
  searchPlaceholder: PropTypes.string,
  onGoBack: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  style: PropTypes.object,
  filters: PropTypes.object,
  backgroundColor: PropTypes.string,
  dividerColor: PropTypes.string,
  minimalistToolbar: PropTypes.bool,
  searchFieldAlignment: PropTypes.oneOf(['left', 'right']),
  /** Condition for display the Edit button */
  conditionToEdit: PropTypes.func,
  /** Condition for display the Delete button */
  conditionToDelete: PropTypes.func,
  /** Condition for display the Redirect button */
  conditionToDownload: PropTypes.func,
  /** Condition for display the Redirect button */
  conditionToRedirect: PropTypes.func,
  /** Condition for display the Bind button */
  conditionToBind: PropTypes.func,
  addMicroActions: PropTypes.array,
  api: PropTypes.any,
  disableRowClick: PropTypes.bool
}

DataTable.defaultProps = {
  data: [],
  options: {},
  params: {},
  shadow: false,
  actions: [],
  pageSize: 10,
  title: '',
  titleProps: undefined,
  onAddClick: null,
  onFilterClick: null,
  addTooltip: '',
  addTitle: null,
  addFilterTitle: null,
  onSelectionChange: () => [],
  onEditClick: null,
  conditionToEdit: () => true,
  conditionToDelete: () => true,
  onDeleteClick: null,
  onExportClick: null,
  onRowClick: undefined,
  loading: undefined,
  disabled: false,
  disabledRow: () => false,
  emptyMessage: null,
  urlParams: {},
  tableBodyClassName: null,
  tableHeaderClassName: null,
  components: {},
  queryParams: {},
  searchPlaceholder: undefined,
  onGoBack: undefined,
  style: {},
  filters: {},
  backgroundColor: colors.white,
  dividerColor: colors.white3,
  minimalistToolbar: false,
  searchFieldAlignment: 'left',
  onBindClick: null,
  onRedirectClick: null,
  conditionToDownload: () => true,
  conditionToRedirect: () => true,
  conditionToBind: () => true,
  onDownloadClick: null,
  addMicroActions: [],
  api: crmApi,
  disableRowClick: false
}

export default DataTable
