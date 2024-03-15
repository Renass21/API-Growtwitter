import { Request, Response } from "express";
import { errorBadRequest, serverError } from "../util/response.helper";
import { AuthService } from "../services/auth.service";

export class LoginController {
    public async login(req: Request, res: Response){
        try {
            //1- Entrada
            const { email, username, password } = req.body;

            if(email || username || password) {
                return errorBadRequest(res);
            }
            //2- Processamento
            const authservice = new AuthService();
            const result = await authservice.login({
                email,
                username,
                password,
            });
            
            //3- Saida
            return res.status(result.code).send(result);

        } catch (error: any) {
            return serverError(res,error);
        }
    }
} 