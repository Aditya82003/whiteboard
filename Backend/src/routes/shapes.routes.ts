import express from 'express'
import { handleDeleteShape} from '../controllers/shape.controller'
import { protectedRoutes } from '../middleware/auth.middleware'

const router = express.Router()

router.delete('/:id/shapeId',protectedRoutes,handleDeleteShape)

export default router