import { Request, Response } from 'express'
import { topicService } from '../services/topic.service'
import HTTP_STATUS from '../constants/httpStatus'

export const getTopicsController = async (req: Request, res: Response) => {
  try {
    const data = await topicService.getAll()
    res.status(HTTP_STATUS.OK).json({ data })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const getTopicByIdController = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const topic = await topicService.getById(id)
    if (!topic) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Topic không tồn tại' })
    }
    res.status(HTTP_STATUS.OK).json({ data: topic })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const createTopicController = async (req: Request, res: Response) => {
  try {
    const newTopic = await topicService.createTopic(req.body)
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Tạo chủ đề thành công',
      data: newTopic
    })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const createCommentController = async (req: Request, res: Response) => {
  const { id } = req.params // topicId
  const { content, author, parentId } = req.body

  try {
    const newComment = await topicService.createComment(id, content, author, parentId)
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Bình luận thành công',
      data: newComment
    })
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message || 'Lỗi tạo comment' })
  }
}
