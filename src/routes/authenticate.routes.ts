import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserControlle";

const authenticaRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticaRouter.post("/session", authenticateUserController.handle);

export { authenticaRouter };
