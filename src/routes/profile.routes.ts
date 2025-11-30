import { Router } from 'express'
import { profileController } from '../controllers/profile.controller'
import { createProfileValidator } from '../middlewares/profile.middlewares'

const profileRouter = Router()

profileRouter.get('/', profileController.getAllProfiles)
profileRouter.get('/id', profileController.getProfilesByIds)
profileRouter.get('/search', profileController.searchProfiles)
profileRouter.post('/', createProfileValidator, profileController.createProfile)

export default profileRouter