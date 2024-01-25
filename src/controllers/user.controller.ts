import { Request, Response } from "express";
import { errorBadRequest, serverError } from "../util/response.helper";
import { User } from "../models/user.model";
import repository from "../database/prisma.repository";

export class UserController{
    public async user(req: Request, res: Response){
       try {
        const {name, username, email, password} = req.body;
        if(!name || !username || !email || !password){
            return errorBadRequest(res)
        }
        const user = new User(name, username, email, password);

        const result = await repository.user.create({
            data: user
        });

        return res.status(201).send({
            ok: true,
            message: "User created successfully",
            data: result
        })


       } catch (error) {
        return serverError(res,error);
       }
    }

}