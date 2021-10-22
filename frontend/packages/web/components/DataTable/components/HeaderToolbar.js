/* eslint-disable no-nested-ternary */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React from 'react'

import classNames from 'classnames'
import { CsvBuilder } from 'filefy'
import PropTypes, { oneOf } from 'prop-types'

import flow from 'lodash/fp/flow'

import CheckboxMui from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import withStyles from '@material-ui/core/styles/withStyles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import InputSelect from '@britania-crm/web-components/InputSelect'

import { withT } from '@britania-crm/i18n'
import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'
import InputSearch from '@britania-crm/web-components/InputSearch'

import style, { ButtonDownload, ButtonGoBack } from '../styles'

import 'jspdf-autotable'

const JsPDF = typeof window !== 'undefined' ? require('jspdf').JsPDF : null
/* eslint-enable no-unused-vars */

export class MTableToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columnsButtonAnchorEl: null,
      exportButtonAnchorEl: null,
      searchText: props.searchText
    }
  }

  onSearchChange = (searchText) => {
    this.props.dataManager.changeSearchText(searchText)
    this.setState({ searchText }, this.props.onSearchChanged(searchText))
  }

  getTableData = () => {
    const columns = this.props.columns
      .filter(
        (columnDef) =>
          (!columnDef.hidden || columnDef.export === true) &&
          columnDef.export !== false &&
          columnDef.field
      )
      .sort((a, b) =>
        a.tableData.columnOrder > b.tableData.columnOrder ? 1 : -1
      )
    const data = (
      this.props.exportAllData ? this.props.data : this.props.renderData
    ).map((rowData) =>
      columns.map((columnDef) => this.props.getFieldValue(rowData, columnDef))
    )

    return [columns, data]
  }

  defaultExportCsv = () => {
    const [columns, data] = this.getTableData()

    let fileName = this.props.title || 'data'
    if (this.props.exportFileName) {
      fileName =
        typeof this.props.exportFileName === 'function'
          ? this.props.exportFileName()
          : this.props.exportFileName
    }

    const builder = new CsvBuilder(`${fileName}.csv`)
    builder
      .setDelimeter(this.props.exportDelimiter)
      .setColumns(columns.map((columnDef) => columnDef.title))
      .addRows(data)
      .exportFile()
  }

  defaultExportPdf = () => {
    if (JsPDF !== null) {
      const [columns, data] = this.getTableData()

      const content = {
        startY: 50,
        head: [columns.map((columnDef) => columnDef.title)],
        body: data
      }

      const unit = 'pt'
      const size = 'A4'
      const orientation = 'landscape'

      const doc = new JsPDF(orientation, unit, size)
      doc.setFontSize(15)
      doc.text(this.props.exportFileName || this.props.title, 40, 40)
      doc.autoTable(content)
      doc.save(`${this.props.exportFileName || this.props.title || 'data'}.pdf`)
    }
  }

  exportCsv = () => {
    if (this.props.exportCsv) {
      this.props.exportCsv(this.props.columns, this.props.data)
    } else {
      this.defaultExportCsv()
    }
    this.setState({ exportButtonAnchorEl: null })
  }

  exportPdf = () => {
    if (this.props.exportPdf) {
      this.props.exportPdf(this.props.columns, this.props.data)
    } else {
      this.defaultExportPdf()
    }
    this.setState({ exportButtonAnchorEl: null })
  }

  renderSearch() {
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization
    }
    if (this.props.search) {
      return (
        <InputSearch
          detached
          name='search'
          autoFocus={this.props.searchAutoFocus}
          className={
            this.props.searchFieldAlignment === 'left' &&
            this.props.showTitle === false
              ? null
              : this.props.classes.searchField
          }
          value={this.state.searchText}
          onChange={(event) => this.onSearchChange(event.target.value)}
          placeholder={
            this.props.searchPlaceholder || localization.searchPlaceholder
          }
          style={{
            maxWidth: 425,
            minWidth: 100
          }}
        />
      )
    }
    return null
  }

  renderDefaultActions() {
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization
    }
    const { classes } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gridGap: 10
        }}
      >
        {this.props.columnsButton && (
          <span>
            <Tooltip title={localization.showColumnsTitle}>
              <IconButton
                classes={classes.tableButton}
                color='inherit'
                onClick={(event) =>
                  this.setState({ columnsButtonAnchorEl: event.currentTarget })
                }
                aria-label={localization.showColumnsAriaLabel}
              >
                <this.props.icons.ViewColumn />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={this.state.columnsButtonAnchorEl}
              open={Boolean(this.state.columnsButtonAnchorEl)}
              onClose={() => this.setState({ columnsButtonAnchorEl: null })}
            >
              <MenuItem
                key='text'
                disabled
                style={{
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: 12
                }}
              >
                {localization.addRemoveColumns}
              </MenuItem>
              {this.props.columns.map((col) => {
                if (!col.hidden || col.hiddenByColumnsButton) {
                  return (
                    <li key={col.tableData.id}>
                      <MenuItem
                        className={classes.formControlLabel}
                        component='label'
                        htmlFor={`column-toggle-${col.tableData.id}`}
                        disabled={col.removable === false}
                      >
                        <CheckboxMui
                          checked={!col.hidden}
                          id={`column-toggle-${col.tableData.id}`}
                          onChange={() =>
                            this.props.onColumnsChanged(col, !col.hidden)
                          }
                        />
                        <span>{col.title}</span>
                      </MenuItem>
                    </li>
                  )
                }
                return null
              })}
            </Menu>
          </span>
        )}
        <this.props.components.Actions
          actions={this.props.actions.filter((a) => a.position === 'toolbar')}
          data={this.props.selectedRows}
          components={this.props.components}
          size='small'
        />
        {this.props.exportCsv && (
          <ButtonDownload
            id='download-file'
            className={classes.downloadButton}
            onClick={this.props.exportCsv}
            size='small'
            color='warning'
            startIcon={<this.props.icons.Export />}
            variant='outlined'
            disabled={false}
          >
            {localization.exportTitle}
          </ButtonDownload>
        )}
        {this.props.FilterButton}
        {this.props.AddButton}
      </div>
    )
  }

  renderSelectedActions() {
    return (
      <>
        <this.props.components.Actions
          actions={this.props.actions.filter(
            (a) => a.position === 'toolbarOnSelect'
          )}
          data={this.props.selectedRows}
          components={this.props.components}
        />
      </>
    )
  }

  renderActions() {
    const { classes } = this.props

    return (
      <div className={classes.actions}>
        <div>
          {this.props.selectedRows && this.props.selectedRows.length > 0
            ? this.renderSelectedActions()
            : this.renderDefaultActions()}
        </div>
      </div>
    )
  }

  renderToolbarTitle(title) {
    const { classes, titleProps } = this.props
    const toolBarTitle =
      typeof title === 'string' ? (
        <Typography
          variant='h5'
          {...titleProps}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: fonts.fontWeight.medium,
            color: colors.primary.main,
            paddingBottom: 0,
            ...(titleProps.style || {})
          }}
        >
          {title}
        </Typography>
      ) : (
        title
      )

    return <div className={classes.title}>{toolBarTitle}</div>
  }

  renderGoBack() {
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization
    }
    return (
      <ButtonGoBack
        color='secondary'
        id={`goBack-${this.props.id}`}
        onClick={this.props.onGoBack}
        size='small'
        variant='outlined'
      >
        {localization.goBack}
      </ButtonGoBack>
    )
  }

  render() {
    const { classes } = this.props
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization
    }
    const title =
      this.props.showTextRowsSelected &&
      this.props.selectedRows &&
      this.props.selectedRows.length > 0
        ? typeof localization.nRowsSelected === 'function'
          ? localization.nRowsSelected(this.props.selectedRows.length)
          : localization.nRowsSelected.replace(
              '{0}',
              this.props.selectedRows.length
            )
        : this.props.showTitle
        ? this.props.title
        : null
    const filter = this.props
    return (
      <Toolbar
        className={classNames(
          classes.root,
          {
            [classes.highlight]:
              this.props.showTextRowsSelected &&
              this.props.selectedRows &&
              this.props.selectedRows.length > 0
          },
          { [classes.minimalistToolbar]: this.props.minimalistToolbar }
        )}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            style={{
              display: 'flex',
              marginBottom: 10
            }}
          >
            {this.props.onGoBack && this.renderGoBack()}
            {title && this.renderToolbarTitle(title)}
            {this.renderActions()}
          </Grid>
          {this.props.searchFieldAlignment === 'left' && this.renderSearch()}
          {this.props.searchFieldAlignment === 'right' && this.renderSearch()}
          {this.props.hasFilter ? (
            <PageFilter
              handleFilter={this.props.handleFilter}
              Form={this.props.filterForm}
            />
          ) : null}
        </Grid>
      </Toolbar>
    )
  }
}

MTableToolbar.defaultProps = {
  actions: [],
  columns: [],
  columnsButton: false,
  localization: {
    addRemoveColumns: 'Add or remove columns',
    nRowsSelected: '{0} row(s) selected',
    showColumnsTitle: 'Show Columns',
    showColumnsAriaLabel: 'Show Columns',
    exportTitle: 'Export',
    exportAriaLabel: 'Export',
    exportCSVName: 'Export as CSV',
    exportPDFName: 'Export as PDF',
    searchTooltip: 'Search',
    searchPlaceholder: 'Search',
    searchAriaLabel: 'Search',
    clearSearchAriaLabel: 'Clear Search'
  },
  search: true,
  showTitle: true,
  searchText: '',
  showTextRowsSelected: true,
  toolbarButtonAlignment: 'right',
  searchAutoFocus: false,
  searchFieldAlignment: 'right',
  searchFieldVariant: 'standard',
  selectedRows: [],
  title: 'No Title!',
  titleProps: {},
  onGoBack: undefined,
  minimalistToolbar: false
}

MTableToolbar.propTypes = {
  id: PropTypes.string.isRequired,
  actions: PropTypes.array,
  columns: PropTypes.array,
  columnsButton: PropTypes.bool,
  components: PropTypes.object.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  localization: PropTypes.object.isRequired,
  onColumnsChanged: PropTypes.func.isRequired,
  dataManager: PropTypes.object.isRequired,
  searchText: PropTypes.string,
  onSearchChanged: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
  selectedRows: PropTypes.array,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  titleProps: PropTypes.object,
  showTitle: PropTypes.bool.isRequired,
  showTextRowsSelected: PropTypes.bool.isRequired,
  toolbarButtonAlignment: PropTypes.string.isRequired,
  searchFieldAlignment: PropTypes.string.isRequired,
  renderData: PropTypes.array,
  data: PropTypes.array,
  exportAllData: PropTypes.bool,
  exportButton: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({ csv: PropTypes.bool, pdf: PropTypes.bool })
  ]),
  exportDelimiter: PropTypes.string,
  exportFileName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  exportCsv: PropTypes.func,
  exportPdf: PropTypes.func,
  classes: PropTypes.object,
  searchAutoFocus: PropTypes.bool,
  FilterButton: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  AddButton: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  searchPlaceholder: PropTypes.string,
  onGoBack: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  minimalistToolbar: PropTypes.bool,
  filter: PropTypes.bool,
  filterForm: PropTypes.element,
  handleFilter: PropTypes.func
}

export const styles = (theme) => ({
  // root: {
  // paddingRight: theme.spacing(1)
  // },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: { flex: '1 1 10%' },
  actions: { color: theme.palette.text.primary },
  title: {
    overflow: 'hidden',
    marginRight: 20
  },
  searchField: { minWidth: 150 },
  formControlLabel: {
    // paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  FilterButton: false,
  AddButton: false,
  searchPlaceholder: undefined,
  minimalistToolbar: { minHeight: 20 },
  tableButton: {
    backgroundColor: '#1F2D3D',
    color: '#EFF2F7'
  }
})

export default flow(withT, withStyles(styles))(MTableToolbar)
