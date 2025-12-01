import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'

export const generateReportValidator = validate(
  checkSchema(
    {
      filters: {
        isObject: { errorMessage: 'Filters phải là một object' },
        optional: true
      }
    },
    ['body']
  )
)
