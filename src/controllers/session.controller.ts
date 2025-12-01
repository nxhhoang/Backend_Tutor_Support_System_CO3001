import { Request, Response } from 'express'
import { sessionService } from '../services/session.service'
import HTTP_STATUS from '../constants/httpStatus'

export const getAllSessionsController = async (req: Request, res: Response) => {
  const data = await sessionService.getAll()
  res.json({ data })
}

export const getSessionsByStudentController = async (req: Request, res: Response) => {
  const { studentId } = req.params
  const data = await sessionService.getByStudent(Number(studentId))
  res.json({ data })
}

export const getSessionsByTutorController = async (req: Request, res: Response) => {
  const { tutorId } = req.params
  const data = await sessionService.getByTutor(Number(tutorId))
  res.json({ data })
}

export const updateSessionStatusController = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const data = await sessionService.updateStatus(Number(id), status)
    res.json({ message: 'Cập nhật trạng thái thành công', data })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const addFeedbackController = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await sessionService.addStudentFeedback(Number(id), req.body)
    res.json({ message: 'Gửi đánh giá thành công', data })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Lỗi khi gửi đánh giá' })
  }
}

export const addTutorFeedbackController = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await sessionService.addTutorFeedback(Number(id), req.body)
    res.json({ message: 'Gửi đánh giá thành công', data })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Lỗi khi gửi đánh giá' })
  }
}

export const getFeedbacksController = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await sessionService.getFeedbacks(Number(id))
  res.json({ data })
}

export const setMeetingReportController = async (req: Request, res: Response) => {
  const { id } = req.params
  const { report } = req.body
  await sessionService.setReport(Number(id), report)
  res.json({ message: 'Đã lưu báo cáo buổi học' })
}
