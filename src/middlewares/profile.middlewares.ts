import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'

export const createProfileValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: { errorMessage: 'Tên không được để trống' },
        isString: { errorMessage: 'Tên phải là chuỗi' }
      },
      email: {
        notEmpty: { errorMessage: 'Email không được để trống' },
        isEmail: { errorMessage: 'Email không hợp lệ' }
      },
      role: {
        isIn: {
          options: [['student', 'tutor']],
          errorMessage: 'Role phải là student hoặc tutor'
        }
      }
    },
    ['body']
  )
)
