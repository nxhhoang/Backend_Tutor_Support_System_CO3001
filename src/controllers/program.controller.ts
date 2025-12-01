import { Request, Response } from 'express'
import { programService } from '../services/program.service'
import HTTP_STATUS from '../constants/httpStatus'

export const getProgramsController = async (req: Request, res: Response) => {
  const { q, category, field } = req.query
  try {
    const data = await programService.getPrograms({
      q: q as string,
      category: category as string,
      field: field as string
    })
    res.status(HTTP_STATUS.OK).json({ data })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const getProgramByIdController = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await programService.getProgramById(Number(id))
  if (!data) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Không tìm thấy chương trình' })
  res.status(HTTP_STATUS.OK).json({ data })
}

export const registerProgramController = async (req: Request, res: Response) => {
  const { id } = req.params
  const { studentId } = req.body
  try {
    const data = await programService.registerProgram(Number(id), studentId)
    res.status(HTTP_STATUS.CREATED).json({ message: 'Đăng ký thành công', data })
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message || 'Lỗi đăng ký' })
  }
}

export const selectTutorController = async (req: Request, res: Response) => {
  const { id } = req.params 
  const { tutorId } = req.body
  try {
    const success = await programService.selectTutor(Number(id), tutorId)
    res.status(HTTP_STATUS.OK).json({ success, message: 'Chọn gia sư thành công' })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Lỗi chọn gia sư' })
  }
}

export const getMatchTutorsController = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await programService.aiMatchTutors(Number(id))
  res.status(HTTP_STATUS.OK).json({ data })
}

export const getRegistrationsController = async (req: Request, res: Response) => {
  const { studentId, programId } = req.query
  if (!studentId || !programId) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cần studentId và programId' })
  }
  const data = await programService.getRegistrations(Number(studentId), Number(programId))
  res.status(HTTP_STATUS.OK).json({ data })
}

export const getTutorsController = async (req: Request, res: Response) => {
  const { programId, q } = req.query
  const data = await programService.getTutors(programId ? Number(programId) : undefined, q as string)
  res.status(HTTP_STATUS.OK).json({ data })
}
