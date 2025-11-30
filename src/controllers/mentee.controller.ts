import { Request, Response } from 'express'
import { menteeService } from '../services/mentee.service'

export const menteeController = {
  async getAll(req: Request, res: Response) {
    const data = await menteeService.getAll()
    res.json(data)
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id)
    const data = await menteeService.getById(id)
    if (!data) return res.status(404).json({ message: 'Không tìm thấy mentee' })
    res.json(data)
  },

  async addNote(req: Request, res: Response) {
    const { menteeId, tutorId, content } = req.body
    const msg = await menteeService.addNote(menteeId, tutorId, content)
    res.json({ message: msg })
  },

  async addFeedback(req: Request, res: Response) {
    const { menteeId, feedback } = req.body
    const msg = await menteeService.addFeedback(menteeId, feedback)
    res.json({ message: msg })
  }
}
