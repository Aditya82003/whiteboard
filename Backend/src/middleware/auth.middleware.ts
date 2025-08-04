import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utilities/jwt"
import { prisma } from "../lib/prisma"


export const protectedRoutes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { jwt } = req.cookies
        if (!jwt) {
            res.status(401).json({
                success: false,
                message: "Unathourized-Please login"
            })
            return
        }
        const decoded = verifyToken(jwt) as { id: string }
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                fullname: true,
                email: true,
                password: false,
                profilePic: true,
                createdAt: true
            }
        })
        if (!user) {
            res.status(4010).json({
                success: false,
                message: "User not found"
            })
            return
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });

    }

}