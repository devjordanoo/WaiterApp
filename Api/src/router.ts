import { Container } from "brandi";
import { Router } from "express";
import CategoriesController from "@controllers/CategoriesController"

const initializeRoutes = (categoriesController: CategoriesController) => {
	const router = Router();

	router.get("/categories", categoriesController.index.bind(categoriesController));
	router.post("/categories", categoriesController.create.bind(categoriesController));

	return router;
}

export { initializeRoutes }
