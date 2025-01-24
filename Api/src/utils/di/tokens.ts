import { token } from "brandi";
import { DatabaseContract } from "@database/contracts/DatabaseContract";

import CategoryRepository from "@repositories/CategoryRepository";

import CategoryUseCases from "@usecases/CategoryUseCases";

import CategoriesController from "@controllers/CategoriesController";

// DATABASE TOKEN
export const DATABASE_TOKEN = token<DatabaseContract>("DATABASE_TOKEN");

// REPOSITORIES TOKEN
export const CATEGORY_REPOSITORIES_TOKEN = token<CategoryRepository>("CATEGORY_REPOSITORIES_TOKEN");

// USECASES TOKEN
export const CATEGORY_USECASES_TOKEN = token<CategoryUseCases>("CATEGORY_USECASES_TOKEN");

// CONTROLLERS TOKEN
export const CATEGORIES_CONTROLLERS_TOKEN = token<CategoriesController>("CATEGORIES_CONTROLLERS_TOKEN");
