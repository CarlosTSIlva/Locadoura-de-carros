import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
    constructor(private listCategoryUseCase: ListCategoryUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const categories = await this.listCategoryUseCase.execute();
        return res.status(200).json(categories);
    }
}

export { ListCategoryController };
