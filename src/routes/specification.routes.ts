import { Request, Response, Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification";

const specificationRoutes = Router();

specificationRoutes.post("/", (req: Request, res: Response) => {
    createSpecificationController().handle(req, res);
});

export { specificationRoutes };
