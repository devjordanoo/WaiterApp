import { Category as CategoryType } from "@prisma/client";
import { Product } from "./Product";

export interface Category extends CategoryType {
	products?: String[] | Product[];
}
