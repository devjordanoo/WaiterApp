import { Category } from "@models/Category";
import { DatabaseContract } from "@database/contracts/DatabaseContract";

interface CategoryRepositoryContract {
	getAll(): Promise<Category[]>;
	create(category: Category): Promise<Category>;
}

export type { CategoryRepositoryContract };
