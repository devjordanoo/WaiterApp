import { Request, Response } from "express";
import { injected } from 'brandi';
import * as tokens from "@/utils/di/tokens";
import { StatusCodes } from "http-status-codes";

import CategoryUseCases from "@usecases/CategoryUseCases";

class CategoriesController {
	constructor(private _categoryUseCases: CategoryUseCases) {}

	async index(req: Request, res: Response) {
		const categories = await this._categoryUseCases.listCategoryUseCase();
		res.status(StatusCodes.OK).json(categories);
	}

	async show(req: Request, res: Response) {
		const category = await this._categoryUseCases.getCategoryByIdUseCase(req.params.id);
		res.status(StatusCodes.OK).json(category);
	}

	async create(req: Request, res: Response) {
		try {
			const category = req.body;
			const createdCategory = await this._categoryUseCases.createCategoryUseCase(category);
			res.status(StatusCodes.OK).json(createdCategory);

		} catch (error: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Internal Server Error',
				details: error.message
			 });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const category = req.body;
			const updatedCategory = await this._categoryUseCases.updateCategoryUseCase(req.params.id, category);
			res.status(StatusCodes.OK).json(updatedCategory);

		} catch (error: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Internal Server Error',
				details: error.message
			 });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = req.params.id;
			await this._categoryUseCases.deleteCategoryUseCase(id);
			res.status(StatusCodes.OK).json({ message: 'Category deleted' });

		} catch (error: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Internal Server Error',
				details: error.message
			 });
		}
	}
}

injected(CategoriesController, tokens.CATEGORY_USECASES_TOKEN);

export default CategoriesController;


