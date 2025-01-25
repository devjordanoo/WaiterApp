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

	async getById(id: string): Promise<Category> {
		const category = await this._clientDatabase.getConnection().category.findUnique({
			where: {
				id: id
			},
			include: {
				products: true
			}
		});
		return category as Category;
	}

	async create(category: Category): Promise<Category> {
		const { products, ...rest } = category;
		const productsIds = products ? products.map((product) => {
			return { id: product };
		}) : undefined;

		const data: Prisma.CategoryCreateInput = {
			name: rest.name,
			icon: rest.icon,
		}

		if(productsIds && productsIds?.length > 0) {
			data.products = {
				connect: productsIds as Prisma.ProductWhereUniqueInput[]
			}
		}

		const createdCategory = await this._clientDatabase.getConnection().category.create({
      data
		});

		return createdCategory;
	}

	async update(id: string, category: Category): Promise<Category> {
		const { products, ...rest } = category;
		const productsIds = products ? products.map((product) => {
			return { id: product };
		}) : undefined;

		const data: Prisma.CategoryUpdateInput = {
			name: rest.name,
			icon: rest.icon,
		}

		if(productsIds && productsIds?.length > 0) {
			data.products = {
				connect: productsIds as Prisma.ProductWhereUniqueInput[]
			}
		}

		const categoryUpdated = await this._clientDatabase.getConnection().category.update({
			where: {
				id
			},
			data
		});

		return categoryUpdated;
	}

	async delete(id: string): Promise<void> {
		await this._clientDatabase.getConnection().category.delete({
			where: {
				id: id
			}
		});
	}
}

injected(CategoryRepository, DATABASE_TOKEN);

export default CategoryRepository;
