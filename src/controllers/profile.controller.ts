import { Request, Response } from 'express'
import { profileService } from '../services/profile.service'
import HTTP_STATUS from '../constants/httpStatus'

export const profileController = {
  async getAllProfiles(req: Request, res: Response) {
    try {
      const profiles = await profileService.getAll()
      const formattedProfiles = profiles.map((p) => ({
        ...p,
        skills: p.skills ? p.skills : [],
        avail: p.avail ? p.avail : []
      }))

      return res.status(HTTP_STATUS.OK).json({
        message: 'Lấy danh sách thành công',
        data: formattedProfiles
      })
    } catch (error) {
      console.log(error)
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async getProfilesByIds(req: Request, res: Response) {
    try {
      const { ids } = req.query

      if (!ids) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: 'Thiếu danh sách id'
        })
      }

      const idList = Array.isArray(ids) ? ids : [ids]
      const parsedIds = idList.map((id) => Number(id)).filter((n) => !isNaN(n))

      if (!parsedIds.length) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: 'Danh sách id không hợp lệ'
        })
      }

      const profiles = await profileService.getByIds(parsedIds)
      const formattedProfiles = profiles.map((p) => ({
        ...p,
        skills: p.skills ?? [],
        avail: p.avail ?? []
      }))

      return res.status(HTTP_STATUS.OK).json({
        message: 'Lấy hồ sơ theo ID thành công',
        data: formattedProfiles
      })
    } catch (error) {
      console.error(error)
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server' })
    }
  },

  async searchProfiles(req: Request, res: Response) {
    const { q } = req.query
    if (!q || typeof q !== 'string') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Thiếu từ khóa tìm kiếm' })
    }

    const results = await profileService.search(q)
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: results,
      message: results.length ? 'Tìm thấy hồ sơ' : 'Không tìm thấy hồ sơ phù hợp'
    })
  },

  async createProfile(req: Request, res: Response) {
    const newProfile = await profileService.create(req.body)
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Tạo hồ sơ thành công',
      data: newProfile
    })
  }
}
