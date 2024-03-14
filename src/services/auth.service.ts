import { randomUUID } from "crypto";
import repository from "../database/prisma.repository";

export interface LoginDTO {
    email: string, 
    username: string,
    password: string
}

export interface Result {
    ok: boolean;
    message: string;
    code: number;
    data?: any;
}
export class AuthService {
    public async login(data: LoginDTO): Promise<Result> {

        const user = await repository.user.findFirst({
            where: {
                email: data.email,
                username: data.username, 
                password: data.password,
            }
        });
        
        if(!user) {
            return {
                ok: false,
                message: "Invalid credentials!",
                code: 401,
            };
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
        return {
            ok: true,
            message: "Login successfully!",
            code:200
        }

    }
}