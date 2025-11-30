// src/utils/validation.ts
import express from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import HTTP_STATUS from '../constants/httpStatus'
import { EntityError, ErrorWithStatus } from '../models/Errors'

/**
 * Middleware validate request body/query/params
 * @param validations - mảng các ValidationChain từ express-validator
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Chạy tuần tự từng validation
    for (const validation of validations) {
      await validation.run(req)
    }

    const errors = validationResult(req)

    // Nếu không có lỗi, tiếp tục request
    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })

    for (const key in errorsObject) {
      const { msg } = errorsObject[key]

      // Nếu lỗi là ErrorWithStatus và status khác 422, next lỗi luôn
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }

      // Gán lỗi validation cho từng field
      entityError.errors[key] = errorsObject[key]
    }

    next(entityError)
  }
}
