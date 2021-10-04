import * as Yup from 'yup'

import dateRange from '@britania-crm/forms/validators/dateRange.validator'
import required from '@britania-crm/forms/validators/required.validator'

const VALUES = {
  company: 'BRITÂNIA ELETRÔNICOS S/A',
  code: {},
  matrix: {},
  responsible: {},
  regionalManager: {},
  date: { from: '', to: '' },
  directorShip: '',
  lines: [],
  linesFromBack: [],
  linesExceptions: [],
  linesExceptionsFromBack: [],
  families: [],
  familiesFromBack: [],
  familiesExceptions: [],
  familiesExceptionsFromBack: [],
  achivements: [],
  negotiatedFunds: [],
  percentages: [],
  observation: '',
  attachments: [],
  active: false
}

export const INITIAL_VALUES = {
  fan: { ...VALUES },
  lastFan: { ...VALUES }
}

export default ({ t }) => {
  const fan = () => Yup.object().shape({
    company: Yup.string(),
    code: required({ t, isNotText: true })(Yup.object()),
    matrix: required({ t, isNotText: true })(Yup.object()),
    responsible: required({ t, isNotText: true })(Yup.object()),
    directorship: Yup.string(),
    regionalManager: required({ t, isNotText: true })(Yup.object()),
    date: dateRange({ t })(Yup.object()),
    observation: Yup.string(),
    active: Yup.bool(),
    lines: required({ t, isNotText: true })(Yup.array()),
    linesFromBack: required({ t, isNotText: true })(Yup.array()),
    linesExceptions: required({ t, isNotText: true })(Yup.array()),
    families: required({ t, isNotText: true })(Yup.array()),
    familiesFromBack: required({ t, isNotText: true })(Yup.array()),
    familiesExceptions: Yup.array(),
    familiesExceptionsFromBack: Yup.array(),
    linesExceptionsFromBack: Yup.array(),

    achivements: required({ t, isNotText: true })(Yup.array()),
    negotiatedFunds: required({ t, isNotText: true })(Yup.array()),
    percentages: required({ t, isNotText: true })(Yup.array()),
    attachments: Yup.array()
  })

  const lastFan = () => Yup.object().shape({
    company: Yup.string(),
    code: Yup.object(),
    matrix: Yup.object(),
    cliente: Yup.object(),
    responsible: Yup.object(),
    directorship: Yup.string(),
    regionalManager: Yup.object(),
    date: dateRange({ t })(Yup.object()),
    observation: Yup.string(),
    active: Yup.bool(),
    lines: Yup.array(),
    linesFromBack: Yup.array(),
    linesExceptions: Yup.array(),
    families: Yup.array(),
    familiesFromBack: Yup.array(),
    familiesExceptions: Yup.array(),
    familiesExceptionsFromBack: Yup.array(),
    linesExceptionsFromBack: Yup.array(),

    achivements: Yup.array(),
    negotiatedFunds: Yup.array(),
    percentages: Yup.array(),
    attachments: Yup.array()
  })

  return Yup.object().shape({
    fan: fan(t),
    lastFan: lastFan(t)
  })
}
