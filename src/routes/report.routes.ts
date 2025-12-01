// src/routes/report.routes.ts
import { Router } from 'express'
import { 
  getReportSummariesController, 
  getDetailedReportsController, 
  generateReportController 
} from '../controllers/report.controller'
import { generateReportValidator } from '../middlewares/report.middlewares'

const router = Router()

router.get('/summaries', getReportSummariesController)
router.get('/detailed', getDetailedReportsController)
router.post('/generate', generateReportValidator, generateReportController)

export default router