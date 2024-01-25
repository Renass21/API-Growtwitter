import { Request, Response } from "express";
import { errorBadRequest, errorNotFound, serverError } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { Tweet } from "../models/tweet.model";
import { adapterUser } from "../util/user.adapter";

export class TweetController{
    public async createNewTweet(req: Request, res: Response){
        try {
           const { idUser } = req.params;
           const{content, type} = req.body;

           if(!content || !type){
            return errorBadRequest(res);
           }

           const user = await repository.user.findFirst({
                where: {
                    idUser,
                }
           });

           if(!user) {
            return errorNotFound(res,"User")
           }

           const userBackEnd = adapterUser(user);

           const tweet = new Tweet(content, type);
           
           const tweetCreated = await repository.tweet.create({
            data: {
                id: tweet.id,
                content: tweet.content,
                type: tweet.type,
                userId: tweet.userId,
            }
           });

           return res.status(201).send({
            ok: true,
            message: "Tweet created successfully",
            data: tweetCreated
           });


        } catch (error) {
            return serverError(res, error);
        }
    }
}