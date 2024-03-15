import { Router } from "express";
import { LoginController } from "../controllers/login.controller";
import { authLoginMiddleware } from "../middlewares/auth.middleware";

export function loginRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const loginController = new LoginController();

    router.post("/", [authLoginMiddleware],  loginController.login);

    return router;
}