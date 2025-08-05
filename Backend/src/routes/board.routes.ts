import express from "express"
import { handleCreateBoard, handleDeleteBoard, handleJoinBoard, handleLeaveboard, handleOwnerBoard, handleSendShapes, handleShapes } from "../controllers/board.controller"
import { protectedRoutes } from "../middleware/auth.middleware"

const router = express.Router()

router.post('/',protectedRoutes,handleCreateBoard)  //create new board
router.get('/',protectedRoutes,handleOwnerBoard)    // show all boards owned+collab

router.post('/:id/join',handleJoinBoard)         // join board 
router.post('/:id/leave',handleLeaveboard)          //leaveboard

router.delete('/:id',protectedRoutes,handleDeleteBoard)  //delete owned board

router.get('/:id/shapes',protectedRoutes,handleShapes)     // get all shapes
router.post('/:id/shapes',protectedRoutes,handleSendShapes)            // send Messages


export default router