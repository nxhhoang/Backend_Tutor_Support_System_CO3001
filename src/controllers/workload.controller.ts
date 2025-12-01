import { Request, Response } from 'express'
import { workloadService } from '../services/workload.service'
import HTTP_STATUS from '../constants/httpStatus' // Giả sử đã có file này

export const getAllWorkloadsController = async (req: Request, res: Response) => {
  try {
    const data = await workloadService.getAll()
    res.status(HTTP_STATUS.OK).json({data})
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const getWorkloadMetricsController = async (req: Request, res: Response) => {
  try {
    const data = await workloadService.getMetrics()
    res.status(HTTP_STATUS.OK).json({data})
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const assignMenteeController = async (req: Request, res: Response) => {
  const { tutorId, studentName } = req.body
  try {
    const data = await workloadService.assignMentee(tutorId, studentName)
    res.status(HTTP_STATUS.OK).json({ 
      message: `Đã gán sinh viên ${studentName} thành công`,
      data: data 
    })
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message })
  }
}