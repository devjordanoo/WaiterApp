import { Product } from './../../models/Product';
import { token } from "brandi";
import { DatabaseContract } from "@database/contracts/DatabaseContract";

import CategoryRepository from "@repositories/CategoryRepository";
import ProductRepository from "@repositories/ProductRepository";

import CategoryUseCases from "@usecases/CategoryUseCases";
import ProductUseCases from "@usecases/ProductUseCases";

import CategoriesController from "@controllers/CategoriesController";
import ProductsController from "@controllers/ProductsController";

// DATABASE TOKEN
export const DATABASE_TOKEN = token<DatabaseContract>("DATABASE_TOKEN");

// CATEGORIES
export const CATEGORY_REPOSITORIES_TOKEN = token<CategoryRepository>("CATEGORY_REPOSITORIES_TOKEN");
export const CATEGORY_USECASES_TOKEN = token<CategoryUseCases>("CATEGORY_USECASES_TOKEN");
export const CATEGORIES_CONTROLLERS_TOKEN = token<CategoriesController>("CATEGORIES_CONTROLLERS_TOKEN");

// PRODUCTS
export const PRODUCT_REPOSITORIES_TOKEN = token<ProductRepository>("PRODUCT_REPOSITORIES_TOKEN");
export const PRODUCT_USECASES_TOKEN = token<ProductUseCases>("PRODUCT_USECASES_TOKEN");
export const PRODUCTS_CONTROLLERS_TOKEN = token<ProductsController>("PRODUCTS_CONTROLLERS_TOKEN");
