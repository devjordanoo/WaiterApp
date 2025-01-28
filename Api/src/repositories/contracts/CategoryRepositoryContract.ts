import { Category } from "@models/Category";

interface CategoryRepositoryContract {
	getAll(): Promise<Category[]>;
	getById(id: string): Promise<Category | null>;
	create(category: Category): Promise<Category>;
	update(id: string, category: Category): Promise<Category>;
	delete(id: string): Promise<void>;
	checkIfExists(id: string): Promise<boolean>;
	checkIfCategoryHaveProducts(id: string): Promise<boolean>;
}

export type { CategoryRepositoryContract };
