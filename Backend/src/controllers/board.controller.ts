import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const handleCreateBoard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ownerId } = req.body
        if (!ownerId) {
            res.status(400).json({
                success: false,
                message: "Please Provide OwnerId"
            })
            return
        }
        const newBaord = await prisma.board.create({
            data: {
                ownerId: ownerId
            }
        })
        if (!newBaord) {
            res.status(400).json({
                success: false,
                message: "Unavailbe to create newBoarrd"
            })
            return
        }
        res.status(200).json({
            success: true,
            data: {
                board: newBaord
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const handleOwnerBoard = async (req: Request, res: Response): Promise<void> => {
    try {
        const ownerId = req.user?.id
        console.log(ownerId)
        if (!ownerId) {
            res.status(400).json({
                success: false,
                message: "Please login"
            })
            return
        }
        const ownerBoards = await prisma.board.findMany({
            where: { ownerId: ownerId },
            include: {
                owner: { select: { id: true, fullname: true } },
                collaborators: { select: { id: true, fullname: true } }
            }
        })
        console.log(ownerBoards)
        const collaboratedBoards = await prisma.board.findMany({
            where: {
                collaborators: {
                    some: { id: ownerId }
                },
                ownerId: {
                    not: ownerId
                }
            },
            include: {
                owner: { select: { id: true, fullname: true } },
                collaborators: { select: { id: true, fullname: true } }
            }
        })

        const allBoards = [...ownerBoards, ...collaboratedBoards]
        res.status(200).json({
            success: true,
            boards: allBoards
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const handleJoinBoard = async (req: Request, res: Response) => {
    try {
        const boardId = req.params.id
        const userId = req.user?.id

        if (!boardId || userId) {
            res.status(400).json({
                success: false,
                message: "User ID or Board ID missing"
            })
            return
        }
        const board = await prisma.board.findUnique({
            where: { id: boardId }
        })
        if (!board) {
            res.status(400).json({
                success: false,
                message: "Board not found"
            })
            return
        }
        const alreadyJoined = await prisma.board.findFirst({
            where: {
                id: boardId,
                collaborators: {
                    some: { id: userId }
                }
            }
        })
        if (alreadyJoined) {
            res.status(400).json({
                success: false,
                message: "You have already joined"
            })
            return
        }
        await prisma.board.update({
            where: { id: boardId },
            data: {
                collaborators: {
                    connect: { id: userId }
                }
            }
        })
        res.status(200).json({
            success: true,
            message: "Successfully Joined"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const handleLeaveboard = async (req: Request, res: Response) => {
    try {

        const boardId = req.params.id
        const userId = req.user?.id

        if (!userId || !boardId) {
            res.status(400).json({
                success: false,
                message: "Please provide ownerid and boardid"
            })
            return
        }
        const board = await prisma.board.findFirst({
            where: { id: boardId }
        })
        if (!board) {
            res.status(400).json({
                success: false,
                message: "No board found"
            })
            return
        }
        const joined = await prisma.board.findFirst({
            where: {
                id: boardId,
                collaborators: {
                    some: { id: userId }
                }
            }
        })
        if (!joined) {
            res.status(400).json({
                success: false,
                message: "Not joined that board"
            })
            return
        }
        await prisma.board.update({
            where: { id: boardId },
            data: {
                collaborators: { disconnect: { id: userId } }   //check this logic
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const handleDeleteBoard = async (req: Request, res: Response): Promise<void> => {
    try {
        const ownerId = req.user?.id
        const boardId = req.params.id
        if (!ownerId || !boardId) {
            res.status(400).json({
                success: false,
                message: "Please provide ownerid and boardid"
            })
            return
        }
        const board = await prisma.board.findUnique({
            where: { id: boardId }
        })
        if (!board || board.ownerId !== ownerId) {
            res.status(401).json({
                success: false,
                message: "Not authorized or board not found"
            })
        }
        await prisma.board.delete({
            where: { id: boardId }
        })
        res.status(200).json({
            success: true,
            message: "Board deleted succcessfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const handleShapes = async (req: Request, res: Response): Promise<void> => {
    try{

        const boardId = req.params.id
        const userId = req.user?.id         // or basically receiver id  (user id who receiving the shapes)
        
        if (!boardId || !userId) {
            res.status(400).json({
            success: false,
            message: "No boardId or userId found"
        })
        return
    }
    //check for the board
    const board = await prisma.board.findUnique({
        where: { id: boardId }
    })
    if (!board) {
        res.status(400).json({
            success: false,
            message: "No board found"
        })
        return
    }
    
    const allshapes = await prisma.message.findMany({
        where: { boardId: boardId }
    })
            res.status(200).json({
                success: true,
                data: {
                    shapes: allshapes
                }
            })
        }catch(error){
            res.status(500).json({
                success:false,
                message:"Server Error"
            })
        }
}

export const handleSendShapes = async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params.id
    const senderId = req.user?.id
    const { data } = req.body
    if (!boardId || !senderId) {
        res.status(400).json({
            success: false,
            message: "No boardId or senderId found"
        })
        return
    }
    try{
        const shapeMessage= await prisma.message.create({
            data:{
                boardId,
                senderId,
                data,
            }
        })
        res.status(200).json({
            success:true,
            message:"Shape sent successfully",
            data:{
                shape:shapeMessage
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Servr error"
        })
    }

}