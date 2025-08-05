import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const handleDeleteShape = async (req: Request, res: Response) => {
    try {
        const boardId = req.params.id
        const userId = req.user?.id
        const { shapeId } = req.body

        if (!boardId || !userId || !shapeId) {
            res.status(400).json({
                success: false,
                message: "No boardId or UserId or shapeId"
            })
            return
        }
        const shape = await prisma.message.findUnique({
            where: { id: shapeId },
        });

        if (!shape || shape.boardId !== boardId) {
            res.status(404).json({
                success: false,
                message: "Shape not found or does not belong to board",
            });
            return;
        }
        if (shape.senderId != userId) {
            res.status(403).json({
                success: false,
                message: "You are not authorized to delete this shape",
            });
            return;
        }
        await prisma.message.delete({
            where: { id: shapeId }
        })
        res.status(200).json({
            success: true,
            message: "Shape deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }

}