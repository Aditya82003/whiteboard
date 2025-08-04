import jwt, { JwtPayload } from "jsonwebtoken"
import { TokenPayload } from "../types/custom"

export const generatedToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
    })
}

export const verifyToken = (token: string): TokenPayload & JwtPayload => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload
    } catch (error) {
        throw new Error(`Error : ${error}`)
    }
}