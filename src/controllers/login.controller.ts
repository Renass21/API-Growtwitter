import { Request, Response } from "express";
import { errorBadRequest, serverError } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { randomUUID } from "crypto";

export class LoginController {
    public async login(req: Request, res: Response){
        try {
            const { email, username, password } = req.body;

            const user = await repository.user.findFirst({
                where: {
                    email,
                    username,
                    password,
                }
            });
            
            if(!user) {
                return res.status(401).send({
                    ok: false,
                    message: "Invalid credentials"
                });
            }
                const token = randomUUID();
                
            await repository.user.update({
                where: {
                        idUser: user.idUser,
                },
                data: {
                    token
                }
            })

            return res.status(200).send({
                ok: true,
                message: "Login successful",
                data: {
                    id: user.idUser,
                    name: user.name,
                    token,
                },
            })

        } catch (error: any) {
            return serverError(res,error);
        }
    }
} 