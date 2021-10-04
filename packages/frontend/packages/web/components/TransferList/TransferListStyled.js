import React, {
  useCallback,
  useState,
  useMemo,
  Fragment,
  forwardRef,
  memo
} from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import partition from 'lodash/partition'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'

import { areEqual } from '@britania-crm/utils/memo'
import Checkbox from '@britania-crm/web-components/Checkbox'
import {
  LeftButtonShuttle,
  RightButtonShuttle
} from '@britania-crm/web-components/Icons'
import InputSearch from '@britania-crm/web-components/InputSearch'
import CircularLoader from '@britania-crm/web-components/Loader/CircularLoader'

import useStyles, {
  ButtonWrapper,
  ListHeader,
  ListTitle,
  AlertHeader,
  AlertHeaderLabel,
  AlertHeaderTitleProfile
} from './styles'

const TransferList = forwardRef(({
  header,
  type,
  title,
  onChange,
  valueKey,
  labelKey,
  value,
  onFilterChange,
  options,
  loading
}, fieldRef) => {
  const classes = useStyles()
  const autoCompleteMode = useMemo(() => !!onFilterChange, [onFilterChange])

  const [checked, setChecked] = useState([])
  const [searched, setSearched] = useState({
    left: '',
    right: ''
  })

  const [left, right] = useMemo(
    () => partition(options, (option) => !find(value, (item) => String(item[valueKey]) === String(option[valueKey]))),
    [options, value, valueKey]
  )

  // Retorna um array com todos os items que não foram marcados/checked,
  const not = useCallback(
    (a, b) => a.filter((val) => !find(b, (item) => item[valueKey] === val[valueKey] || item[valueKey] === String(val[valueKey]))),
    [valueKey]
  )

  /**
   * Faz uma intersecção do conjunto geral de todos os que estão marcados/checkeds,
   * seja da lista da direita ou da esquerda, separando em um novo array
   *  */
  const intersection = useCallback(
    (a, b) => a.filter((val) => !!find(b, (item) => item[valueKey] === val[valueKey] || item[valueKey] === String(val[valueKey]))),
    [valueKey]
  )

  /**
   *  Retorna um array com todos os items que foram marcados/checked
   *  da lista da esquerda
   * */
  const leftChecked = useMemo(
    () => intersection(checked, left),
    [checked, intersection, left]
  )

  /**
   *  Retorna um array com todos os items que foram marcados (checked)
   *  da lista da direita
   * */
  const rightChecked = useMemo(
    () => intersection(checked, right),
    [checked, intersection, right]
  )

  // Shuttle
  const requestSearch = useCallback(
    (side, event) => {
      const { value } = event.target
      if (autoCompleteMode) onFilterChange(side, value)

      if (side === 'right') {
        setSearched((prevState) => ({ ...prevState, right: value }))
      } else {
        setSearched((prevState) => ({ ...prevState, left: value }))
      }
    },
    [autoCompleteMode, onFilterChange]
  )

  const filteredRightResults = useMemo(() => filter(right, (item) => item && item[labelKey]?.toLowerCase()?.includes(searched?.right?.toLowerCase())), [labelKey, right, searched.right])

  const filteredLeftResults = useMemo(() => not(filter(left, (item) => item && item[labelKey]?.toLowerCase()?.includes(searched?.left?.toLowerCase())), right), [not, left, right, labelKey, searched.left])

  const handleToggle = useCallback(
    (value) => () => {
      const currentIndex = checked.indexOf(value)
      const newChecked = [...checked]

      if (currentIndex === -1) {
        newChecked.push(value)
      } else {
        newChecked.splice(currentIndex, 1)
      }

      setChecked(newChecked)
    },
    [checked]
  )

  const handleMoveCheckedToLeft = useCallback(
    () => {
      onChange(filter(value, (option) => !find(rightChecked, (item) => String(item[valueKey]) === String(option[valueKey]))))
      setChecked((oldChecked) => not(oldChecked, rightChecked), valueKey)
    },
    [onChange, value, valueKey, rightChecked, not]
  )

  const handleMoveCheckedToRight = useCallback(
    () => {
      if (autoCompleteMode) {
        onChange([
          ...value,
          ...checked
        ])
        setChecked([])
      } else {
        onChange([
          ...value,
          ...leftChecked
        ])
        setChecked((oldChecked) => not(oldChecked, leftChecked), valueKey)
      }
    },
    [autoCompleteMode, valueKey, onChange, value, checked, leftChecked, not]
  )

  const createList = useCallback(
    (side, items) => (
      <List className={ classes.list } dense component="div">
        {loading && side === 'left' ? (
          <CircularLoader relative />
        ) : map(items, (item) => (
          <Fragment key={ `${ side }-${ item[valueKey] }` }>
            <ListItem button onClick={ handleToggle(item) }>
              <ListItemIcon>
                <Checkbox
                  detached
                  value={ checked.indexOf(item) !== -1 }
                  tabIndex={ -1 }
                  style={ { marginBottom: 0 } }
                />
              </ListItemIcon>
              <ListItemText primary={ item[labelKey] } />
            </ListItem>
            {(items.indexOf(item) !== (items.length - 1)) && <Divider classes={ { root: classes.divider } }/>}
          </Fragment>
        ))}
      </List>
    ),
    [checked, classes.divider, classes.list, handleToggle, labelKey, loading, valueKey]
  )

  const leftList = useMemo(
    () => createList('left', filteredLeftResults),
    [createList, filteredLeftResults]
  )

  const rightList = useMemo(
    () => createList('right', filteredRightResults),
    [createList, filteredRightResults]
  )

  return (
    <Paper
      ref={ fieldRef }
      className={ classNames(
        classes.root,
        classes.paper
      ) }
    >
      {header && (
        <AlertHeader>
          <AlertHeaderLabel variant="body2">
            {type}:
          </AlertHeaderLabel>
          <AlertHeaderTitleProfile
            variant="h5"
          >{header}</AlertHeaderTitleProfile>
        </AlertHeader>

      )}

      <ButtonWrapper>
        <Box my={ 3 }>
          <Button
            className={ classes.circleButton }
            onClick={ handleMoveCheckedToRight }
            disabled={ leftChecked.length === 0 }
          >
            <RightButtonShuttle/>
          </Button>
        </Box>
        <Button
          className={ classes.circleButton }
          onClick={ handleMoveCheckedToLeft }
          disabled={ rightChecked.length === 0 }
        >
          <LeftButtonShuttle/>
        </Button>
      </ButtonWrapper>
      <Grid container justify="center" alignItems="center" className={ classes.root }>
        <Grid item style={ { marginRight: 26 } }>
          <Paper className={ classes.card }>
            <ListHeader>
              <ListTitle>{title} Disponíveis</ListTitle>
              <InputSearch
                detached
                value={ searched?.left }
                onChange={ (e) => requestSearch('left', e) }
                placeholder="Busque por nome"
                fullWidth
              />
            </ListHeader>
            {leftList}
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={ classes.card }>
            <ListHeader>
              <ListTitle>{title} Selecionados</ListTitle>
              <InputSearch
                detached
                value={ searched?.right }
                onChange={ (e) => requestSearch('right', e) }
                placeholder="Busque por nome"
                fullWidth
                disabled={ isEmpty(right) && !searched?.right }
              />
            </ListHeader>
            {rightList}
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
})

TransferList.propTypes = {
  header: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,

  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string
  })),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string
  })),
  onFilterChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  loading: PropTypes.bool
}

TransferList.defaultProps = {
  header: '',
  type: '',
  title: '',
  onChange () {},
  onFilterChange: false,
  valueKey: 'id',
  labelKey: 'name',
  value: [],
  options: [],
  loading: false
}

export default memo(TransferList, areEqual)
