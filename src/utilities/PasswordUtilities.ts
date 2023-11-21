import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"
import { UserPayload } from "../dto/auth.dto"


export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async ( enteredPassword: string, savedPassword: string, salt?: string) => {
    return await bcrypt.compare(enteredPassword, savedPassword)
} 


export const GenerateToken = (payload: UserPayload) => {
    const signature = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d'})
    return signature
}