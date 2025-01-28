import { Container } from "brandi";
import PrismaClient from "@database/Prisma";

import CategoryRepository from "@repositories/CategoryRepository";
import ProductRepository from "@repositories/ProductRepository";

import CategoryUseCases from "@usecases/CategoryUseCases";
import ProductUseCases from "@usecases/ProductUseCases";

import CategoriesController from "@controllers/CategoriesController";
import ProductsController from "@controllers/ProductsController";

import * as tokens from "./tokens";

const initializeContainer = () => {
	const container = new Container();
	container.bind(tokens.DATABASE_TOKEN).toInstance(PrismaClient).inSingletonScope();

	// categories
	container.bind(tokens.CATEGORY_REPOSITORIES_TOKEN).toInstance(CategoryRepository).inSingletonScope();
	container.bind(tokens.CATEGORY_USECASES_TOKEN).toInstance(CategoryUseCases).inSingletonScope();
	container.bind(tokens.CATEGORIES_CONTROLLERS_TOKEN).toInstance(CategoriesController).inSingletonScope();

	// products
	container.bind(tokens.PRODUCT_REPOSITORIES_TOKEN).toInstance(ProductRepository).inSingletonScope();
	container.bind(tokens.PRODUCT_USECASES_TOKEN).toInstance(() => {
		return new ProductUseCases(container.get(tokens.PRODUCT_REPOSITORIES_TOKEN), container.get(tokens.CATEGORY_REPOSITORIES_TOKEN));
	}).inSingletonScope();
	container.bind(tokens.PRODUCTS_CONTROLLERS_TOKEN).toInstance(ProductsController).inSingletonScope();

	return container;
}

export { initializeContainer };
