import React from 'react'

import * as I18n from '@britania-crm/i18n'

/*
  Quando o component 'I18n'
  precisar ser usado dentro de algum componente testável,
*/
export const mockUseT = () => jest.spyOn(I18n, 'useT')
  .mockImplementation(() => ({
    t: ({ id }) => id
  }))

export const mockUseRef = (current) => jest.spyOn(React, 'useRef')
  .mockReturnValueOnce({ current })
