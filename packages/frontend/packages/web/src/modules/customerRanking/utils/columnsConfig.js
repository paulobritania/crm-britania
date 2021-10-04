import React from 'react'

import EditableCellNumber from '../components/EditableCellNumber/EditableCellNumber'
import EditableSelect from '../components/EditableSelect/EditableSelect'
import HeaderItem from '../components/HeaderItem/HeaderItem'
import WeightSum from '../components/WeightSum/WeightSum'
import * as INDICATORS from '../constants/table'

const getColumsConfigs = () => [
  {
    Header: () => null,
    id: 'expander',
    Footer: () => null,
    columns: [
      {
        Header: () => null,
        accessor: INDICATORS.DESCRIPTION,
        Footer: () => 'Total'
      }
    ]
  },
  {
    Header: (props) => (
      <HeaderItem
        startColor="#94D8FF"
        data={ props }
      >Diamante</HeaderItem>
    ),
    id: 'DIAMOND',
    Footer: '',
    columns: [
      {
        Header: () => '',
        accessor: INDICATORS.DIAMOND_SYMBOL,
        Cell: (props) => <EditableSelect props={ props }/>,
        Footer: ''
      },
      {
        Header: 'Meta',
        accessor: INDICATORS.DIAMOND_GOAL,
        Cell: (prop) => <EditableCellNumber prop={ prop } />,
        Footer: ''
      },
      {
        Header: 'Peso',
        headerId: INDICATORS.WEIGHT,
        accessor: INDICATORS.DIAMOND_WEIGHT,
        Cell: (prop) => <EditableCellNumber prop={ prop } />,
        Footer (info) {
          const total = React.useMemo(
            () =>
              info.rows.reduce((sum, row) => row.values.[INDICATORS.DIAMOND_WEIGHT] + sum, 0),
            [info.rows]
          )

          return <WeightSum>{total}</WeightSum>
        }
      }
    ]
  },
  {
    Header: (props) => (
      <HeaderItem
        startColor="#FFDD64"
        data={ props }
      >Ouro</HeaderItem>
    ),
    Footer: '',
    id: 'GOLD',
    columns: [
      {
        Header: () => '',
        accessor: INDICATORS.GOLD_SYMBOL,
        Cell: (props) => <EditableSelect props={ props }/>,
        Footer: ''
      },
      {
        Header: 'Meta',
        accessor: INDICATORS.GOLD_GOAL,
        Cell: (prop) => <EditableCellNumber prop={ prop } />,
        Footer: ''
      },
      {
        Header: 'Peso',
        headerId: INDICATORS.WEIGHT,
        accessor: INDICATORS.GOLD_WEIGHT,
        Cell: (prop) => <EditableCellNumber prop={ prop } />,
        Footer (info) {
          const total = React.useMemo(
            () =>
              info.rows.reduce((sum, row) => row.values.[INDICATORS.GOLD_WEIGHT] + sum, 0),
            [info.rows]
          )

          return <WeightSum>{total}</WeightSum>
        }
      }
    ]
  },
  {
    Header: (props) => (
      <HeaderItem
        data ={ props }
        startColor="#CED4DA"
      >Prata</HeaderItem>
    ),
    id: 'SILVER',
    Footer: '',
    columns: [
      {
        Header: () => '',
        accessor: INDICATORS.SILVER_SYMBOL,
        Cell: (props) => <EditableSelect props={ props }/>,
        Footer: ''
      },
      {
        Header: 'Meta',
        accessor: INDICATORS.SILVER_GOAL,
        Cell: (prop) => <EditableCellNumber prop={ prop } />,
        Footer: ''
      },
      {
        Header: 'Peso',
        headerId: INDICATORS.WEIGHT,
        accessor: INDICATORS.SILVER_WEIGHT,
        Cell: (prop) => <EditableCellNumber prop={ prop } />,
        Footer (info) {
          const total = React.useMemo(
            () =>
              info.rows.reduce((sum, row) => row.values.[INDICATORS.SILVER_WEIGHT] + sum, 0),
            [info.rows]
          )

          return <WeightSum>{total}</WeightSum>
        }
      }
    ]
  },
  {
    Header: (props) => (
      <HeaderItem
        data={ props }
        startColor="#EA9E5B"
      >Bronze</HeaderItem>),
    Footer: '',
    id: 'BRONZE',
    columns: [
      {
        Header: () => '',
        accessor: INDICATORS.BRONZE_SYMBOL,
        Cell: (props) => <EditableSelect props={ props }/>,
        Footer: ''
      },
      {
        Header: 'Meta',
        accessor: INDICATORS.BRONZE_GOAL,
        Cell: (prop) => <EditableCellNumber prop={ prop } />,
        Footer: ''
      },
      {
        Header: 'Peso',
        headerId: INDICATORS.WEIGHT,
        accessor: INDICATORS.BRONZE_WEIGHT,
        Cell: (prop) => <EditableCellNumber prop={ prop } />,
        Footer (info) {
          const total = React.useMemo(
            () =>
              info.rows.reduce((sum, row) => row.values.[INDICATORS.BRONZE_WEIGHT] + sum, 0),
            [info.rows]
          )

          return <WeightSum>{total}</WeightSum>
        }
      }
    ]
  }
]

export default getColumsConfigs
