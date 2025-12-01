import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'

export const createTopicValidator = validate(
  checkSchema(
    {
      title: {
        notEmpty: { errorMessage: 'Tiêu đề không được để trống' },
        isString: { errorMessage: 'Tiêu đề phải là chuỗi' }
      },
      author: {
        notEmpty: { errorMessage: 'Tác giả không được để trống' },
        isString: { errorMessage: 'Tác giả phải là chuỗi' }
      }
    },
    ['body']
  )
)

export const createCommentValidator = validate(
  checkSchema(
    {
      content: {
        notEmpty: { errorMessage: 'Nội dung không được để trống' }
      },
      author: {
        notEmpty: { errorMessage: 'Tác giả không được để trống' }
      },
      parentId: {
        optional: true,
        isString: { errorMessage: 'parentId phải là chuỗi ID' }
      }
    },
    ['body']
  )
)
