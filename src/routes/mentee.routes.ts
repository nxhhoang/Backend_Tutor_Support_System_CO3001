import { Router } from 'express'
import { menteeController } from '.././controllers/mentee.controller'

const router = Router()

router.get('/', menteeController.getAll)
router.get('/:id', menteeController.getById)
router.post('/note', menteeController.addNote)
router.post('/feedback', menteeController.addFeedback)

export default router
