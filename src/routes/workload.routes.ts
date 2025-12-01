import { Router } from 'express'
import { 
  getAllWorkloadsController, 
  getWorkloadMetricsController, 
  assignMenteeController 
} from '../controllers/workload.controller'
import { assignMenteeValidator } from '../middlewares/workload.middlewares'

const router = Router()

router.get('/', getAllWorkloadsController)
router.get('/metrics', getWorkloadMetricsController)
router.post('/assign', assignMenteeValidator, assignMenteeController)

export default router