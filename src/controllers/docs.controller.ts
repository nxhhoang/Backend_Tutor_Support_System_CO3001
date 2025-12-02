import { Request, Response } from 'express'
import * as docsService from '../services/docs.service'
import HTTP_STATUS from '../constants/httpStatus'

export const getAllDocsController = async (req: Request, res: Response) => {
  try {
    const data = await docsService.getAllDocs()
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy danh sách tài liệu thành công',
      data
    })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const searchDocsController = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string
    const data = await docsService.searchDocs(keyword)
    res.status(HTTP_STATUS.OK).json({
      message: 'Tìm kiếm tài liệu thành công',
      data
    })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}

export const downloadDocController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const msg = await docsService.downloadDoc(id)
    res.status(HTTP_STATUS.OK).json({
      message: msg || 'Yêu cầu tải tài liệu thành công',
      data: null
    })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
  }
}