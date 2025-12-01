import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'

export const registerProgramValidator = validate(
  checkSchema(
    {
      studentId: {
        isInt: { errorMessage: 'studentId phải là số' },
        notEmpty: { errorMessage: 'Thiếu studentId' }
      }
    },
    ['body']
  )
)

export const selectTutorValidator = validate(
  checkSchema(
    {
      tutorId: {
        isInt: { errorMessage: 'tutorId phải là số' },
        notEmpty: { errorMessage: 'Thiếu tutorId' }
      }
    },
    ['body']
  )
)
