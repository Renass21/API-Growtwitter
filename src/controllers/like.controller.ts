import { Request, Response } from "express";
import { errorBadRequest, errorNotFound, serverError, sucessfullRequest } from "../util/response.helper";
import repository from "../database/prisma.repository";

export class LikeController {
    public async createLike(req: Request, res: Response) {
        try {
            const { idTweet, idUser } = req.params;

            if (!idUser) {
                return errorNotFound(res, "User");
            };

            const user = await repository.user.findUnique({
                where: {
                    idUser
                },
            });

            if (!user) {
                return errorNotFound(res, "User");
            };

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: idTweet
                },
            })
            
            if (!tweet) {
                return errorNotFound(res, "Tweet");
            }

            const verifyLike = await repository.like.findFirst({
                where: {
                    idUser: idUser,
                    idTweet,
                },
            });
            
            if (verifyLike) {
                return errorBadRequest(res);
            }
        
            await repository.like.create({
                data: {
                    idTweet,
                    idUser,
                },
            });
            
            return sucessfullRequest(res, "Like created sucessfully");

        } catch (error) {
            serverError(res, error);
        }
    }

    public async deleteLike(req: Request, res: Response) {
        try {
            const { idTweet, idUser } = req.params;
            
            const user = await repository.user.findUnique({
                where: {
                    idUser,
                },
            });

            if (!user) {
                return errorNotFound(res, "User");
            };

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: idTweet,
                }
            });

            if(!tweet) {
                return errorNotFound(res, "Tweet");
            };

            const like = await repository.like.findFirst({
                where: {
                    idTweet,
                    idUser
                },
            });

            await repository.like.delete({
                where: {
                    idTweet,
                    idUser,
                },
            });

            return sucessfullRequest(res, "Like deleted sucessfully")

        } catch (error) {
            serverError(res, error);
        }
    }
}

