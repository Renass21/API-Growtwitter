import { Request, Response } from "express";
import { errorBadRequest, errorNotFound, serverError, sucessfullRequest } from "../util/response.helper";
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

           const userBackend = adapterUser(user);

           const tweet = new Tweet(content, type, userBackend);
           
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
    public async getTweet(req: Request, res: Response){
        try {
          const { idUser, id } = req.params;
          
          if(!idUser || !id){
            return errorBadRequest(res);
          }

          const user = await repository.user.findUnique({
            where: {
                idUser
            }
          })

          if(!user){
            return errorNotFound(res, "User");
          }
          
          const tweet = await repository.tweet.findUnique({
            where: {
                id: idUser,
            }
          })
          
          if(!tweet){
            return errorNotFound(res, "Tweet");
          }

            return sucessfullRequest(res, "Tweet");
            
        } catch (error) {
            serverError(res, error);
        }
    }

    public async getAllTweets(req: Request, res: Response){
        try {
            const { idUser } = req.params;
            
            if(!idUser){
                return errorBadRequest(res);
            };

            const user = await repository.user.findUnique({
                where: {
                    idUser
                },
            });

            if(!user){
                return errorNotFound(res, "User");
            };

            const tweets = await repository.tweet.findMany({
                where: {
                    userId: idUser
                },
            });
            return sucessfullRequest(res, "tweets");

        } catch (error) {
            serverError(res, error);
        }
    }

    public async updateTweet(req: Request, res: Response){
        try {
            const { idUser, id } = req.params;
            const { content, type } = req.body;

            if(!content || !type){
                return errorBadRequest(res);
            };

            const user = await repository.user.findUnique({
                where: {
                    idUser
                },
            });

            if(!user){
                return errorNotFound(res, "User");
            };

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: id,
                },
            });

            if(!tweet){  
                return errorNotFound(res, "Tweet");
            };

            await repository.tweet.update({
                where: {
                    id
                },
                data: {
                    content,
                    type
                }
            });

            return sucessfullRequest(res, "Tweet updated");

        } catch (error) {
            serverError(res, error);
        }
    }


    public async deleteTweet(req: Request, res: Response){
      try {
            const { idUser, id } = req.params;

            const user = await repository.user.findUnique({
                where: {
                    idUser
                },
            });

            if(!user){
                return errorNotFound(res, "User");
            };

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: id,
                },
            });

            if(!tweet){  
                return errorNotFound(res, "Tweet");
            };

            await repository.tweet.delete({
                where: {
                    id
                },
            });

            return sucessfullRequest(res, "Tweet deleted");

      } catch (error) {
        return serverError(res, error)
      }
    }
}