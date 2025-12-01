import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'

export const feedbackValidator = validate(
  checkSchema(
    {
      comment: {
        notEmpty: { errorMessage: 'Nội dung nhận xét không được trống' }
      },
      'ratingCriteria.practicalRelevance': {
        isInt: { options: { min: 1, max: 5 }, errorMessage: 'Điểm phải từ 1-5' }
      }
    },
    ['body']
  )
)

export const statusValidator = validate(
  checkSchema(
    {
      status: {
        isIn: {
          options: [['confirmed', 'cancelled', 'completed']],
          errorMessage: 'Trạng thái không hợp lệ'
        }
      }
    },
    ['body']
  )
)
