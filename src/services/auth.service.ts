import { randomUUID } from "crypto";
import repository from "../database/prisma.repository";
import { LoginDTO } from "../contracts/login.contract";
import { Result } from "../contracts/result.contract";
import jwt from "jsonwebtoken";



export class AuthService {
    public async login(data: LoginDTO): Promise<Result> {

        const user = await repository.user.findFirst({
            where: {
                email: data.email,
                username: data.username, 
                password: data.password,
            },
            select: {
                idUser: true,
                name:  true,
            }
        });
        
        if(!user) {
            return {
                ok: false,
                message: "Invalid credentials!",
                code: 401,
            };
        }
        
        const token = jwt.sign(user, process.env.JWT_SECRET!);


        return {
            ok: true,
            message: "Login successfully!",
            code:200
        }

    }
}