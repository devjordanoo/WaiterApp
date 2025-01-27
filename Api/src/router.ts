import { Container } from "brandi";
import { Router } from "express";
import CategoriesController from "@controllers/CategoriesController"
import { validateData } from "@/middlewares";
import CategoryValidator from "@/validators/CategoryValidator";
import * as tokens from "@/utils/di/tokens";

const initializeRoutes = (container: Container) => {
	const router = Router();

	const controllers = {
		categories: container.get(tokens.CATEGORIES_CONTROLLERS_TOKEN)
	}

	// Categories
	router.get("/categories", controllers.categories.index);
	router.get("/categories/:id", controllers.categories.show);
	router.post("/categories", validateData(CategoryValidator), controllers.categories.create);
	router.put("/categories/:id", validateData(CategoryValidator), controllers.categories.update);
	router.delete("/categories/:id", controllers.categories.delete);

	return router;
}

export { initializeRoutes }
