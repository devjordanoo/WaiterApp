import { Request, Response } from "express";
import { injected } from 'brandi';
import * as tokens from "@/utils/di/tokens";
import { StatusCodes } from "http-status-codes";

import CategoryUseCases from "@usecases/CategoryUseCases";
import { CustomMessageError } from "@/errors/CustomMessageError";
import BaseController from "@controllers/BaseController";

class CategoriesController extends BaseController {
	constructor(private _categoryUseCases: CategoryUseCases) {
		super();
	}

	async index(req: Request, res: Response) {
		const limit = parseInt(req.query.limit as string) || 10;
		const page = parseInt(req.query.page as string) || 1;
		const search = req.query.search as string;

		const categories = await this._categoryUseCases.listCategoryUseCase(page, limit, search);
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

			res.status(StatusCodes.CREATED).json(createdCategory);
		} catch (error: any) {
			const customMessageError = new CustomMessageError(error);

			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Internal Server Error',
				details: customMessageError.message
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


