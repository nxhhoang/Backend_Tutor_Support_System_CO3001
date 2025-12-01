import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'

export const feedbackValidator = validate(
  checkSchema(
    {
      comment: {
        notEmpty: { errorMessage: 'Nội dung nhận xét không được trống' }
      },
      practicalRelevance: {
        isInt: { options: { min: 1, max: 5 }, errorMessage: 'Điểm thực tế phải từ 1-5' }
      },
      knowledgeLoad: {
        isInt: { options: { min: 1, max: 5 }, errorMessage: 'Điểm kiến thức phải từ 1-5' }
      },
      clarity: {
        isInt: { options: { min: 1, max: 5 }, errorMessage: 'Điểm rõ ràng phải từ 1-5' }
      },
      enthusiasm: {
        isInt: { options: { min: 1, max: 5 }, errorMessage: 'Điểm nhiệt tình phải từ 1-5' }
      },
      goalTransmission: {
        isInt: { options: { min: 1, max: 5 }, errorMessage: 'Điểm truyền đạt phải từ 1-5' }
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

export const createSessionValidator = validate(
  checkSchema(
    {
      programId: {
        isInt: { errorMessage: 'programId phải là số' },
        notEmpty: { errorMessage: 'programId không được để trống' }
      },
      tutorId: {
        isInt: { errorMessage: 'tutorId phải là số' },
        notEmpty: { errorMessage: 'tutorId không được để trống' }
      },
      studentId: {
        isInt: { errorMessage: 'studentId phải là số' },
        notEmpty: { errorMessage: 'studentId không được để trống' }
      },
      mode: {
        isIn: { options: [['online', 'offline']], errorMessage: 'mode phải là online hoặc offline' }
      },
      time: {
        isISO8601: { errorMessage: 'time phải là ngày hợp lệ' }
      },
      subject: {
        notEmpty: { errorMessage: 'subject không được để trống' }
      },
      location: {
        optional: true,
        isString: { errorMessage: 'location phải là chuỗi' }
      },
      status: {
        optional: true,
        isIn: { options: [['pending', 'confirmed', 'completed', 'cancelled']], errorMessage: 'status không hợp lệ' }
      }
    },
    ['body']
  )
)