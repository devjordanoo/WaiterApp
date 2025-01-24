import { Category } from "@models/Category";
import { CategoryRepositoryContract } from "./contracts/CategoryRepositoryContract";
import { DatabaseContract } from "@database/contracts/DatabaseContract";
import { injected } from 'brandi';
import { DATABASE_TOKEN } from "@/utils/di/tokens";
import { Prisma } from "@prisma/client";

class CategoryRepository implements CategoryRepositoryContract {
	constructor(private _clientDatabase: DatabaseContract) {}

	async getAll(): Promise<Category[]> {
		return await this._clientDatabase.getConnection().category.findMany();
	}
	async create(category: Category): Promise<Category> {
		console.log("Repo: ", category)
		return category;
	}
}

injected(CategoryRepository, DATABASE_TOKEN);

export default CategoryRepository;
