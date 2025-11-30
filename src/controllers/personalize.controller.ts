import { Request, Response } from 'express'
import { personalizeService } from '~/services/personalize.service'

export const personalizeController = {
  async getPreferences(req: Request, res: Response) {
    res.json(await personalizeService.getPreferences())
  },
  async getGoals(req: Request, res: Response) {
    res.json(await personalizeService.getGoals())
  },
  async getRecommendations(req: Request, res: Response) {
    res.json(await personalizeService.getRecommendations())
  },
  async getProgress(req: Request, res: Response) {
    res.json(await personalizeService.getProgress())
  },
  async setFeedback(req: Request, res: Response) {
    const { id } = req.params
    const { type } = req.body

    const data = await personalizeService.setFeedback(id, type)
    res.json({ message: 'OK', updated: data })
  }
}
