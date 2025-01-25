import { Container } from "brandi";
import { Router } from "express";
import CategoriesController from "@controllers/CategoriesController"
import { validateData } from "@/middlewares";
import CategoryValidator from "@/validators/CategoryValidator";

const initializeRoutes = (categoriesController: CategoriesController) => {
	const router = Router();

	// Categories
	router.get("/categories", categoriesController.index.bind(categoriesController));
	router.get("/categories/:id", categoriesController.show.bind(categoriesController));
	router.post("/categories", validateData(CategoryValidator), categoriesController.create.bind(categoriesController));
	router.put("/categories/:id", validateData(CategoryValidator), categoriesController.update.bind(categoriesController));
	router.delete("/categories/:id", categoriesController.delete.bind(categoriesController));

	return router;
}

export { initializeRoutes }
