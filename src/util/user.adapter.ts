import { User } from "@prisma/client";
import { User as UserBackEnd } from "../models/user.model";

export function adapterUser(user: User): UserBackEnd {
    const userBackEnd = new UserBackEnd(
        user.name, 
        user.email,
        user.username,
        user.password
    );
    
    userBackEnd.idUser = user.idUser;
    
    return userBackEnd;
}