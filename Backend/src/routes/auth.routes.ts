import express from "express"
import { handleCheckAuth, handleSignin, handleSignOut, handleSignUp, handleUploadProfile } from "../controllers/auth.controller"
import { protectedRoutes } from "../middleware/auth.middleware"

const router = express.Router()

router.post('/signin',handleSignin)
router.post('/signup',handleSignUp)
router.post('/signout',handleSignOut)
router.put('/upload-profile',protectedRoutes,handleUploadProfile)

router.get('/check',protectedRoutes,handleCheckAuth)

export default router