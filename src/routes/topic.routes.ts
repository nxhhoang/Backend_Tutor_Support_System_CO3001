import { Router } from 'express'
import {
  getTopicsController,
  getTopicByIdController,
  createTopicController,
  createCommentController
} from '../controllers/topic.controller'
import { createTopicValidator, createCommentValidator } from '../middlewares/topic.middlewares'

const router = Router()

router.get('/', getTopicsController)
router.get('/:id', getTopicByIdController)
router.post('/', createTopicValidator, createTopicController)
router.post('/:id/comments', createCommentValidator, createCommentController)

export default router
