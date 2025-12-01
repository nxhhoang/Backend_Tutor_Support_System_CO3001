import { Router } from 'express'
import { 
  getAllSessionsController,
  getSessionsByStudentController,
  getSessionsByTutorController,
  updateSessionStatusController,
  addFeedbackController,
  addTutorFeedbackController,
  setMeetingReportController,
  getFeedbacksController
} from '../controllers/session.controller'
import { feedbackValidator, statusValidator } from '../middlewares/session.middlewares'

const router = Router()

router.get('/', getAllSessionsController)
router.get('/student/:studentId', getSessionsByStudentController)
router.get('/tutor/:tutorId', getSessionsByTutorController)
router.patch('/:id/status', statusValidator, updateSessionStatusController)
router.post('/:id/feedback', feedbackValidator, addFeedbackController)
router.get('/:id/feedback', getFeedbacksController)
router.post('/:id/tutor-feedback', addTutorFeedbackController)
router.patch('/:id/report', setMeetingReportController)

export default router