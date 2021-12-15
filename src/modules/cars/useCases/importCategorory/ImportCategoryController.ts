import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    handle(req: Request, res: Response): Response {
        this.importCategoryUseCase.execute(req.file);
        return res.send();
    }
}

export { ImportCategoryController };
