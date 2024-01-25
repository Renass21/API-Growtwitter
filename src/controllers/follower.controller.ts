import { Request, Response } from "express";
import { errorBadRequest, serverError } from "../util/response.helper";
import repository from "../database/prisma.repository";

export class FollowController {
    public async follow(req: Request, res: Response){
        try {
            const { idUser } = req.params;
            const { idFollowing } = req.body;   

            if(idUser === idFollowing) {
                return res.status(400).send({
                    ok: false,
                    message: "You can't follow yourself"
                });
            };

            const user = await repository.user.findUnique({
                where: {
                    idUser,
                }
            });

            if(!user) {
                return errorBadRequest(res)
            }

            
            const follow = await repository.follow.create({
                data: {}
            })
        }catch (error) {
            return serverError(res, error);
        }
    }
}