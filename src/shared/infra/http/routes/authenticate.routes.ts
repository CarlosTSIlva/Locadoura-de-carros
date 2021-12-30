import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserControlle';
import { Router } from 'express';

const authenticaRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticaRouter.post('/session', authenticateUserController.handle);

export { authenticaRouter };
