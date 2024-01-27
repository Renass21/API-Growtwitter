import express  from "express";
import cors from "cors";
import { LoginController } from "./controllers/login.controller";
import { UserController } from "./controllers/user.controller";
import { TweetController } from "./controllers/tweet.controller";

const app = express();
app.use(express.json());
app.use(cors());

const loginController = new LoginController();
const userController = new UserController();
const tweetController = new TweetController();

app.post("/signup", userController.user);
app.post("/login", loginController.login);
app.post("/tweet", tweetController.createNewTweet);
app.get("/tweets", tweetController.getTweet);
app.get("/tweets/:id", tweetController.getAllTweets);





app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

