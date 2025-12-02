import { Request, Response } from 'express'
import { menteeService } from '../services/mentee.service'
import HTTP_STATUS from '../constants/httpStatus'

export const menteeController = {
  async getAll(req: Request, res: Response) {
    try {
      const data = await menteeService.getAll()
      res.status(HTTP_STATUS.OK).json({
        message: 'Lấy danh sách mentee thành công',
        data
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const data = await menteeService.getById(id)
      if (!data) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Không tìm thấy mentee' })
      res.status(HTTP_STATUS.OK).json({
        message: 'Lấy chi tiết mentee thành công',
        data
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async addNote(req: Request, res: Response) {
    try {
      const { menteeId, tutorId, content } = req.body
      const msg = await menteeService.addNote(menteeId, tutorId, content)
      res.status(HTTP_STATUS.OK).json({
        message: msg || 'Thêm ghi chú thành công',
        data: null
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async addFeedback(req: Request, res: Response) {
    try {
      const { menteeId, feedback } = req.body
      const msg = await menteeService.addFeedback(menteeId, feedback)
      res.status(HTTP_STATUS.OK).json({
        message: msg || 'Thêm feedback thành công',
        data: null
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  }
}