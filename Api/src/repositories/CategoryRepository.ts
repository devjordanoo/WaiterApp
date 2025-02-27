import { Category } from "@models/Category";
import { CategoryRepositoryContract } from "./contracts/CategoryRepositoryContract";
import { DatabaseContract } from "@database/contracts/DatabaseContract";
import { injected } from 'brandi';
import { DATABASE_TOKEN } from "@/utils/di/tokens";
import { Prisma } from "@prisma/client";
import { PaginateContract } from "@repositories/contracts/PaginateContract";

class CategoryRepository implements CategoryRepositoryContract {
	constructor(private _clientDatabase: DatabaseContract) {}

	async getAll(page: number, limit: number, search: string): Promise<PaginateContract<Category>> {
		const where: Prisma.CategoryWhereInput = {
			active: true
		}

		if(search) {
			where.name = {
				contains: search
			}
		}

		const [categories, total] = await this._clientDatabase.getConnection().$transaction([
			this._clientDatabase.getConnection().category.findMany({
				where,
				take: limit,
				skip: (page - 1) * limit
			}),
			this._clientDatabase.getConnection().category.count()
		]);

		const data: PaginateContract<Category> = {
			currentPage: page,
			total: total,
			data: categories
		}

		return data
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
		try {
			await this._clientDatabase.getConnection().category.update({
				where: {
					id
				},
				data: {
					active: false
				}
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async checkIfExists(id: string): Promise<boolean> {
		const category = await this._clientDatabase.getConnection().category.findUnique({
			where: {
				id: id
			},
			select: {
				id: true
			}
		});

		return category ? true : false;
	}

	async checkIfCategoryHaveProducts(id: string): Promise<boolean> {
		const category = await this._clientDatabase.getConnection().category.findUnique({
			where: {
				id: id
			},
			select: {
				id: true,
				products: {
					select: {
						id: true
					}
				}
			}
		});

		if(category?.products?.length === 0) {
			return false;
		}

		return true;
	}

}

injected(CategoryRepository, DATABASE_TOKEN);

export default CategoryRepository;
