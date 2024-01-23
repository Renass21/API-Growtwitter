import express  from "express";
import cors from "cors";
import { LoginController } from "./controllers/login.controller";
import { UserController } from "./controllers/user.controller";

const app = express();
app.use(express.json());
app.use(cors());

const loginController = new LoginController();
const userController = new UserController();

app.post("/signup", userController.user)
app.post("/login", loginController.login)


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

