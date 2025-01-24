import { Request, Response } from "express";
import { injected } from 'brandi';
import { Category } from "@models/Category";
import * as tokens from "@/utils/di/tokens";

import CategoryUseCases from "@usecases/CategoryUseCases";

class CategoriesController {
	constructor(private _categoryUseCases: CategoryUseCases) {}

	async index(req: Request, res: Response) {
		const categories = await this._categoryUseCases.listCategoryUseCase();
		res.send(categories);
	}

	async create(req: Request, res: Response) {
		const category = req.body;
		console.log(category)
		const createdCategory = await this._categoryUseCases.createCategoryUseCase(category);
		res.send(createdCategory);
	}
}

injected(CategoriesController, tokens.CATEGORY_USECASES_TOKEN);

export default CategoriesController;


