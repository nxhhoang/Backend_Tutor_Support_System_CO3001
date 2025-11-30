import express from 'express'
import { personalizeController } from '~/controllers/personalize.controller'
import { feedbackValidator } from '~/middlewares/personalize.middlewares'

const router = express.Router()

router.get('/preferences', personalizeController.getPreferences)
router.get('/goals', personalizeController.getGoals)
router.get('/recommendations', personalizeController.getRecommendations)
router.get('/progress', personalizeController.getProgress)

router.post('/recommendations/:id/feedback', feedbackValidator, personalizeController.setFeedback)

export default router
