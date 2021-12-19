import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRouter } from "./user.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/categories", categoriesRoutes);
router.use("/specification", specificationRoutes);

export { router };
