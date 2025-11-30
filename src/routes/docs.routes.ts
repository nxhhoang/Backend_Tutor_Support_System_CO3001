import { Router } from 'express'
import { getAllDocsController, searchDocsController, downloadDocController } from '.././controllers/docs.controller'
import { searchDocsValidator } from '.././middlewares/docs.middlewares'

const router = Router()

router.get('/', getAllDocsController)
router.get('/search', searchDocsValidator, searchDocsController)
router.get('/:id/download', downloadDocController)

export default router
