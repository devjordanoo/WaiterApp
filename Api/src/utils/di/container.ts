import { Container } from "brandi";
import PrismaClient from "@database/Prisma";

import CategoryRepository from "@repositories/CategoryRepository";

import CategoryUseCases from "@usecases/CategoryUseCases";

import CategoriesController from "@controllers/CategoriesController";

import * as tokens from "./tokens";

const initializeContainer = () => {
	const container = new Container();
	container.bind(tokens.DATABASE_TOKEN).toInstance(PrismaClient).inSingletonScope();

	// Bind Repositories
	console.log("bind Repositories");
	container
		.bind(tokens.CATEGORY_REPOSITORIES_TOKEN)
		.toInstance(CategoryRepository)
		.inSingletonScope();

	// Bind UseCases
	console.log("bind UseCases");
	container
		.bind(tokens.CATEGORY_USECASES_TOKEN)
		.toInstance(CategoryUseCases)
		.inSingletonScope();

	// Bind Controllers
	console.log("bind controllers");
	container
		.bind(tokens.CATEGORIES_CONTROLLERS_TOKEN)
		.toInstance(CategoriesController)
		.inSingletonScope();

		return container;
}

export { initializeContainer };
