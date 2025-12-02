import { Request, Response } from 'express'
import { reportService } from '../services/report.service'
import HTTP_STATUS from '../constants/httpStatus'

export const getReportSummariesController = async (req: Request, res: Response) => {
  try {
    const data = await reportService.getSummaries()
    res.status(HTTP_STATUS.OK).json({ data })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const getDetailedReportsController = async (req: Request, res: Response) => {
  const { semester } = req.query
  try {
    const semesterStr = typeof semester === 'string' ? semester : 'all'
    const data = await reportService.getDetailed(semesterStr)
    res.status(HTTP_STATUS.OK).json({ data })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const generateReportController = async (req: Request, res: Response) => {
  const { filters } = req.body
  try {
    const result = await reportService.generate(filters)
    res.status(HTTP_STATUS.OK).json(result)
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}