import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const feedbackValidator = validate(
  checkSchema({
    type: {
      isIn: {
        options: [['up', 'down']],
        errorMessage: 'type phải là up hoặc down'
      }
    }
  })
)
