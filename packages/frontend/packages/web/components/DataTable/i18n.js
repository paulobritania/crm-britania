export default (t) => ({
  fetchLoadError: t('datagrid fetch load error'),
  body: {
    addTooltip: t('datagrid body add tooltip'),
    deleteTooltip: t('datagrid body delete tooltip'),
    editRow: {
      deleteText: t('datagrid body edit row delete text'),
      cancelTooltip: t('datagrid body edit row cancel tooltip'),
      saveTooltip: t('datagrid body edit row save tooltip')
    },
    editTooltip: t('datagrid body edit tooltip'),
    emptyDataSourceMessage: t('datagrid body empty data source message'),
    filterRow: { filterTooltip: t('datagrid body filter row filter tooltip') },
    bulkEditTooltip: t('datagrid body edit all'),
    bulkEditApprove: t('datagrid body save all changes'),
    bulkEditCancel: t('datagrid body discard all changes')
  },
  grouping: {
    groupedBy: t('datagrid grouping grouped by'),
    placeholder: t('datagrid grouping placeholder')
  },
  header: { actions: t('datagrid header actions') },
  pagination: {
    labelDisplayedRows: t(
      'datagrid pagination label displayed rows',
      {
        from: '{from}',
        to: '{to}',
        count: '{count}'
      }
    ),
    labelRowsSelect: t('datagrid pagination label rows select'),
    labelRowsPerPage: t('datagrid pagination label rows per page'),
    firstAriaLabel: t('datagrid pagination first aria label'),
    firstTooltip: t('datagrid pagination first tooltip'),
    previousAriaLabel: t('datagrid pagination previous aria label'),
    previousTooltip: t('datagrid pagination previous tooltip'),
    nextAriaLabel: t('datagrid pagination next aria label'),
    nextTooltip: t('datagrid pagination next tooltip'),
    lastAriaLabel: t('datagrid pagination last aria label'),
    lastTooltip: t('datagrid pagination last tooltip')
  },
  toolbar: {
    addRemoveColumns: t('datagrid toolbar add remove columns'),
    nRowsSelected: t('datagrid toolbar n rows selected', { 0: '{0}' }),
    showColumnsTitle: t('datagrid toolbar show columns title'),
    showColumnsAriaLabel: t('datagrid toolbar show columns aria label'),
    exportTitle: t('datagrid toolbar export title'),
    exportAriaLabel: t('datagrid toolbar export aria label'),
    exportName: t('datagrid toolbar export name'),
    searchTooltip: t('datagrid toolbar search tooltip'),
    searchPlaceholder: t('datagrid toolbar search placeholder'),
    goBack: t('back')
  }
})
