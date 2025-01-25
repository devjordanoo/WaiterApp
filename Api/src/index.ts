import express from "express";
import { initializeContainer } from "@/utils/di/container";
import { DATABASE_TOKEN, CATEGORIES_CONTROLLERS_TOKEN, CATEGORY_USECASES_TOKEN } from "@/utils/di/tokens";

import { initializeRoutes } from "./router";

const app = express();
const PORT = process.env.APP_PORT || 3000;
const container = initializeContainer();

const PrismaClient = container.get(DATABASE_TOKEN);

PrismaClient.connect()
.then(() => {
		console.log("Connected to database");
		const CategoriesController = container.get(CATEGORIES_CONTROLLERS_TOKEN);

		app.use(express.json());
		app.use(initializeRoutes(CategoriesController));

		app.listen(3001, () => {
			console.log(`Listening on port ${PORT}`);
			console.log(`http://localhost:${PORT}/`);
		});
	})
	.catch((err) => {
		console.log("Não foi possivel conectar com a base de dados");
		console.error(err);
	});

