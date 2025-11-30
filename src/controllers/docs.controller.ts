import { Request, Response } from 'express'
import * as docsService from '.././services/docs.service'

export const getAllDocsController = async (req: Request, res: Response) => {
  const data = await docsService.getAllDocs()
  res.json(data)
}

export const searchDocsController = async (req: Request, res: Response) => {
  const keyword = req.query.keyword as string
  const data = await docsService.searchDocs(keyword)
  res.json(data)
}

export const downloadDocController = async (req: Request, res: Response) => {
  const id = req.params.id
  const msg = await docsService.downloadDoc(id)
  res.json({ message: msg })
}
