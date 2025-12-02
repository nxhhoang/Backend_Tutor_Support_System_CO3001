import { Request, Response } from 'express'
import { personalizeService } from '~/services/personalize.service'
import HTTP_STATUS from '~/constants/httpStatus' 

export const personalizeController = {
  async getPreferences(req: Request, res: Response) {
    try {
      const data = await personalizeService.getPreferences()
      res.status(HTTP_STATUS.OK).json({
        message: 'Lấy danh sách sở thích thành công',
        data
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async getGoals(req: Request, res: Response) {
    try {
      const data = await personalizeService.getGoals()
      res.status(HTTP_STATUS.OK).json({
        message: 'Lấy danh sách mục tiêu thành công',
        data
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async getRecommendations(req: Request, res: Response) {
    try {
      const data = await personalizeService.getRecommendations()
      res.status(HTTP_STATUS.OK).json({
        message: 'Lấy danh sách gợi ý thành công',
        data
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async getProgress(req: Request, res: Response) {
    try {
      const data = await personalizeService.getProgress()
      res.status(HTTP_STATUS.OK).json({
        message: 'Lấy tiến độ học tập thành công',
        data
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async setFeedback(req: Request, res: Response) {
    const { id } = req.params
    const { type } = req.body

    try {
      const data = await personalizeService.setFeedback(id, type)
      res.status(HTTP_STATUS.OK).json({
        message: 'Gửi phản hồi thành công',
        data
      })
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  }
}
