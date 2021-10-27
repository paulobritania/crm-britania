import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default {
  // loadingType: 'linear',
  selection: false,
  columnsButton: false,
  sorting: true,
  paging: false,
  grouping: false,
  filtering: false,
  debounceInterval: 500,
  pageSizeOptions: [2, 5, 10, 20, 50, 100],
  initialPage: 0,
  actionsColumnIndex: -1,
  emptyRowsWhenPaging: false,
  toolbar: true,
  search: true,
  draggable: false,
  addRowPosition: 'first',
  toolbarProps: { color: 'primary' },
  headerStyle: {
    zIndex: 11,
    fontWeight: fonts.fontWeight.bold,
    padding: '10px 16px',
    color: colors.secondary.main
  },
  actionsCellDivStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 10
  },
  actionsCellStyle: { width: 'auto' },
  editActionsStyle: { justifyContent: 'center' },
  searchFieldProps: {
    type: 'search',
    InputProps: { endAdornment: null }
  },
  rowStyle: {
    fontFamily: 'Maven Pro',
    fontSize: fonts.fontSize.S,
    color: colors.black2,
    fontWeight: fonts.fontWeight.regular
  },
  paginationType: 'stepped',
  paginationIconButtonProps: { size: 'small' },
  paginationActiveIconButtonProps: {
    size: 'small',
    color: 'primary'
  }
}
