/* eslint-disable @typescript-eslint/ban-types */
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { PagedResult } from './pagedResult.dto'

export const PagedApiResponse = (
  model: Function,
  description: string
): MethodDecorator & ClassDecorator =>
  ApiOkResponse({
    description,
    isArray: false,
    schema: {
      allOf: [
        { $ref: getSchemaPath(PagedResult) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(model) }
            }
          }
        }
      ]
    }
  })
