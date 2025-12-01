// src/routes/program.routes.ts
import { Router } from 'express'
import { 
  getProgramsController, 
  getProgramByIdController, 
  registerProgramController,
  getRegistrationsController,
  getTutorsController,
  selectTutorController,
  getMatchTutorsController
} from '../controllers/program.controller'
import { registerProgramValidator, selectTutorValidator } from '../middlewares/program.middlewares'

const router = Router()

router.get('/', getProgramsController)
router.get('/tutors', getTutorsController)
router.get('/registrations', getRegistrationsController)
router.get('/:id', getProgramByIdController)
router.post('/:id/register', registerProgramValidator, registerProgramController)
router.post('/registrations/:id/select-tutor', selectTutorValidator, selectTutorController)
router.get('/registrations/:id/match-tutors', getMatchTutorsController)

export default router