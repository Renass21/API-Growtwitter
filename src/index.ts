import express  from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import { LoginController } from "./controllers/login.controller";
import { UserController } from "./controllers/user.controller";
import { TweetController } from "./controllers/tweet.controller";
import { logMiddleware } from "./middlewares/log.middleware.";
import { authLoginMiddleware } from "./middlewares/auth.middleware";

const app = express();
app.use(express.json());
app.use(cors());

const loginController = new LoginController();
const userController = new UserController();
const tweetController = new TweetController();

app.post("/signup", userController.user);

app.post("/tweet", [logMiddleware, authLoginMiddleware] ,tweetController.createNewTweet);
app.get("/tweets", [logMiddleware, authLoginMiddleware] ,tweetController.getTweet);
app.get("/tweets/:id", [logMiddleware, authLoginMiddleware] ,tweetController.getAllTweets);


app.post("/login", [logMiddleware, authLoginMiddleware] ,loginController.login);


app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
})

