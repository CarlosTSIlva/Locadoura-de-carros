import { Router } from 'express';

import { authenticaRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specification.routes';
import { usersRouter } from './user.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/categories', categoriesRoutes);
router.use('/specification', specificationRoutes);
router.use('/cars', carsRouter);
router.use(authenticaRouter);

export { router };
