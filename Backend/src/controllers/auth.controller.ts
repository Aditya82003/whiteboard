
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt"
import { generatedToken } from "../utilities/jwt";

export const handleSignin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Please provide all credentials",
            })
            return
        }
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
            return
        }
        const isPasswrdMatched = await bcrypt.compare(password, user.password)
        if (!isPasswrdMatched) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
            return
        }
        const token = generatedToken({ id: user.id.toString() })
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                    profile: user.profilePic || null
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during signin"
        })
    }
}

export const handleSignUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullname, email, password } = req.body

        if (!fullname || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Please provide all credentials"
            })
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPasswrd = await bcrypt.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                fullname,
                email,
                password: hashedPasswrd
            }
        })
        if (!newUser) {
            res.status(400).json({
                success: false,
                message: "Unable to create new User"
            })
        }
        const token = generatedToken({ id: newUser.id.toString() })
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            success: true,
            data: {
                id: newUser.id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic || null
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during signin"
        })
    }
}

export const handleSignOut = (req: Request, res: Response) => {
     res.clearCookie("jwt", {
        httpOnly: true,
        secure:true,
        sameSite: "none",
        path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
    return
}

export const handleUploadProfile = (req: Request, res: Response) => {

}

export const handleCheckAuth = (req: Request, res: Response) => {
    try{
        res.status(200).json({
            success:true,
            data:{
                user:req.user
            }
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:"Server error"
        })
    }
}



