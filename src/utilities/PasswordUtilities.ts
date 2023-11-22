import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"
import { UserPayload } from "../dto/auth.dto"
import { Request } from "express"


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

export const validateToken = async (req: Request): Promise<boolean> => {
    try {
      const token = req.cookies.token;
  
      if (token) {
        const payload = jwt.verify(token, JWT_SECRET) as UserPayload;        
        req.user = payload;
        return true;
      }
  
      return false;
    } catch (error:any) {
      console.error('Error verifying token:', error.message);
      return false;
    }
  };