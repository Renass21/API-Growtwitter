import { NextFunction, Request, Response } from "express";
import { serverError } from "../util/response.helper";
import repository from "../database/prisma.repository";

export async function authLoginMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        const { idUser } = req.params;

        if (!authorization) {
            return res.status(401).send({ 
                ok: false,
                message: "Token doesn't exist." 
            });
        };
         
        const user = await repository.user.findUnique({
            where: {
                idUser,
            },
        });

        if (!user || user.token !== authorization) {
            return res.status(401).send({ 
                ok: false,
                message: "Token invalid or unauthorized." 
            });
        }
            next();

        } catch (error: any) {
        serverError(res,error);
    }
}