import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prismaClient";
import { PermissionError } from "../../errors/PermissionError";
import {compare} from "bcrypt";
import statusCodes from "../../utils/constants/statusCodes";
import { User } from "@prisma/client";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { TokenError } from "../../errors/TokenError";



function generateJWT(user: User, res: Response){
    const body = {
    id: user.id,
    email: user.email, 
    role: user.role,
    name: user.fullName
    };

    const token = sign({user: body}, 
        process.env.SECRET_KEY || " ",
        {expiresIn: Number(process.env.JWT_EXPIRATION)}
    );

    res.cookie("jwt", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    });
}

function cookieExtractor(req: Request){
    let token = null;
    if(req.cookies){
        token = req.cookies["jwt"];
    
    }
    return token;
}

export function verifyJWT(req: Request, res: Response, next: NextFunction){

    try {
        const token = cookieExtractor(req)

        if(token){
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            req.user = decoded.user;

        }

        if(req.user == null){
            throw new TokenError("Você precisa estar logado para realizar essa ação!");
        }

        next();

    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction){
    try {
        const token = cookieExtractor(req);

        if (token) {
            return res.status(statusCodes.FORBIDDEN).json("Você já está logado!");
        }
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if(!user){
            console.log("Usuário não encontrado com o email:", req.body.email);
            throw new PermissionError("Email e/ou senha incorretos!");
        }

        const match = await compare(req.body.password, user.password);
        
        if(!match){
            throw new PermissionError("Email e/ou senha incorretos!");
        }

        generateJWT(user, res);
        res.status(statusCodes.SUCCESS).json("Login realizado com sucesso!");
    } catch (error) {
        next(error);
    }
};


export async function logout(req: Request, res: Response, next: NextFunction){
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development"
        });
        
        res.status(statusCodes.SUCCESS).json("Logout realizado com sucesso!");
    } catch (error) {
        next(error);
    }

}



export async function notLoggedIn(req: Request, res: Response, next: NextFunction){
    try {
        const token = cookieExtractor(req);
        
        if(!token){
            throw new TokenError("Você precisa estar logado para realizar essa ação!");
        }
    } catch (error) {
        next(error);
    }

}

export function checkRole(requiredRoles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = cookieExtractor(req);
        try {
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            const user = decoded.user;

            if (!requiredRoles.includes(user.role)) {
                return res.status(statusCodes.UNAUTHORIZED).json("Você não está autorizado a fazer isso.");
            }
            next();
        } catch (error) {
            next(error);
        }
    };
}