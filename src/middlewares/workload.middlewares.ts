import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'

export const assignMenteeValidator = validate(
  checkSchema(
    {
      tutorId: {
        isInt: { errorMessage: 'tutorId phải là số nguyên' },
        notEmpty: { errorMessage: 'Thiếu tutorId' }
      },
      studentName: {
        isString: { errorMessage: 'studentName phải là chuỗi ký tự' },
        notEmpty: { errorMessage: 'Thiếu studentName' }
      }
    },
    ['body']
  )
)
