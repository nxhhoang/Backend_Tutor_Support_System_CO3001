import { Request, Response, NextFunction } from 'express'

export const searchDocsValidator = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.keyword) return res.status(400).json({ message: 'keyword is required' })
  next()
}
