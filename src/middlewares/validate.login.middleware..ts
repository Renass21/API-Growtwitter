import { NextFunction, Request, Response } from "express";
import { errorBadRequest, serverError } from "../util/response.helper";

export function validateLoginMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const { email, username, password } = req.body;

        if( !email || !username || !password ) {
            return errorBadRequest(res);
        } 
        next();

    } catch (error) {
        serverError(res, error);
    }
}