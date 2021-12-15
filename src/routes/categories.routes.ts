import { Request, Response, Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategorory";
import { listCategoryController } from "../modules/cars/useCases/listCategory";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

categoriesRoutes.get("/", (req: Request, res: Response) => {
    return listCategoryController.handle(req, res);
});

categoriesRoutes.post("/", (req: Request, res: Response) => {
    return createCategoryController.handle(req, res);
});

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    (req: Request, res: Response) => {
        importCategoryController.handle(req, res);
    }
);

export { categoriesRoutes };
