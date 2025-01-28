import { Product as ProductType } from "@prisma/client";
import { Ingredient } from "./Ingredient";

export interface Product extends ProductType {
	ingredients?: Ingredient[]
	orders?: string[]
}
