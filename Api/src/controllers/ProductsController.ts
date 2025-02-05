import { Request, Response } from "express";
import { injected } from 'brandi';
import * as tokens from "@/utils/di/tokens";
import { StatusCodes } from "http-status-codes";

import ProductUseCases from "@usecases/ProductUseCases";
import { CustomMessageError } from "@/errors/CustomMessageError";
import BaseController from "@controllers/BaseController";

class ProductsController extends BaseController {
	constructor(private _productUseCases: ProductUseCases) {
		super();
	}

	async index(req: Request, res: Response) {
		const limit = parseInt(req.query.limit as string) || 10;
		const page = parseInt(req.query.page as string) || 1;
		const search = req.query.search as string;

		const products = await this._productUseCases.listProductUseCase(page, limit, search);
		res.status(StatusCodes.OK).json(products);
	}

	async show(req: Request, res: Response) {
		try {
			const product = await this._productUseCases.getProductByIdUseCase(req.params.id);
			res.status(StatusCodes.OK).json(product);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
		}
	}

	async create(req: Request, res: Response) {
		try {
			const product = req.body;
			const createdProduct = await this._productUseCases.createProductUseCase(product);

			res.status(StatusCodes.CREATED).json(createdProduct);
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
			const product = req.body;
			const updatedProduct = await this._productUseCases.updateProductUseCase(req.params.id, product);

			res.status(StatusCodes.OK).json(updatedProduct);
		} catch (error: any) {
			const customMessageError = new CustomMessageError(error);

			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Internal Server Error',
				details: customMessageError.message
			 });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			await this._productUseCases.deleteProductUseCase(req.params.id);
			res.status(StatusCodes.OK).json({ message: 'Product deleted' });
		} catch (error: any) {
			const customMessageError = new CustomMessageError(error);

			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Internal Server Error',
				details: customMessageError.message
			 });
		}
	}

	async addProductToCategory(req: Request, res: Response) {
		try {
			const productId = req.params.id;
			const categoryId = req.body.categoryId;

			const _product = await this._productUseCases.addProductToCategoryUseCase(productId, categoryId);
			res.status(StatusCodes.OK).json({ product: _product, message: 'Product added to category' });
		} catch (error: any) {
			const customMessageError = new CustomMessageError(error);

			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: 'Internal Server Error',
				details: customMessageError.message
			 });
		}
	}
}

injected(ProductsController, tokens.PRODUCT_USECASES_TOKEN);

export default ProductsController;
