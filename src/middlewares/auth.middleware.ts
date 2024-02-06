import { Request, Response } from "express";
import { serverError } from "../util/response.helper";

export async function authLoginMiddleware(req: Request, res: Response) {
    try {
        
    } catch (error: any) {
        serverError(res,error);
    }
}