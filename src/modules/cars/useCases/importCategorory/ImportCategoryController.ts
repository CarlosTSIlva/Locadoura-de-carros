import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        await importCategoryUseCase.execute(req.file);
        return res.status(201).send();
    }
}

export { ImportCategoryController };
