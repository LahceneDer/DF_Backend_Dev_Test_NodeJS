import { NextFunction, Request, Response } from "express";
import { UserPayload } from "../dto/auth.dto";
import { validateToken } from "../utilities/PasswordUtilities";


declare global {
    namespace Express {
        interface Request{
            user?: UserPayload
        }
    }
}


export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await validateToken(req)
    if(validate) {        
        next()
    } else {
        return res.json({ message: "user not authorized"})

    }
    
}