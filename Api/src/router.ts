import { Container } from "brandi";
import { Router } from "express";
import { validateData } from "@/middlewares";
import CategoryValidator from "@/validators/CategoryValidator";
import ProductValidator from "@/validators/ProductValidator";
import * as tokens from "@/utils/di/tokens";

const initializeRoutes = (container: Container) => {
	const router = Router();

	const controllers = {
		categories: container.get(tokens.CATEGORIES_CONTROLLERS_TOKEN),
		products: container.get(tokens.PRODUCTS_CONTROLLERS_TOKEN)
	}

	// Categories
	router.get("/categories", controllers.categories.index);
	router.get("/categories/:id", controllers.categories.show);
	router.post("/categories", validateData(CategoryValidator), controllers.categories.create);
	router.put("/categories/:id", validateData(CategoryValidator), controllers.categories.update);
	router.delete("/categories/:id", controllers.categories.delete);

	// Products
	router.get("/products", controllers.products.index);
	router.get("/products/:id", controllers.products.show);
	router.post("/products", validateData(ProductValidator), controllers.products.create);
	router.put("/products/:id", validateData(ProductValidator), controllers.products.update);
	router.delete("/products/:id", controllers.products.delete);
	router.patch("/products/:id/addcategory", controllers.products.addProductToCategory);

	return router;
}

export { initializeRoutes }
