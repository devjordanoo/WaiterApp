import { Category } from "@models/Category";
import { DatabaseContract } from "@database/contracts/DatabaseContract";

interface CategoryRepositoryContract {
	getAll(): Promise<Category[]>;
	getById(id: string): Promise<Category | null>;
	create(category: Category): Promise<Category>;
	update(id: string, category: Category): Promise<Category>;
	delete(id: string): Promise<void>;
}

export type { CategoryRepositoryContract };
