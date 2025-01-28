import { Product } from '@models/Product';
import { ProductRepositoryContract } from "./contracts/ProductRepositoryContract";
import { DatabaseContract } from "@database/contracts/DatabaseContract";
import { injected } from 'brandi';
import { DATABASE_TOKEN } from "@/utils/di/tokens";
import { Prisma } from "@prisma/client";
import crypto from "crypto";

class ProductRepository implements ProductRepositoryContract {
	constructor(private _clientDatabase: DatabaseContract) {}
	async getAll(): Promise<Product[]> {
		return await this._clientDatabase.getConnection().product.findMany({
			where: {
				active: true,
			},
			include: {
				category: true,
			}
		});
	}

	async getById(id: string): Promise<Product | null> {
		return await this._clientDatabase.getConnection().product.findUnique({
			where: {
				id: id
			}
		});
	}

	async create(product: Product): Promise<Product> {
		try {
			const { ingredients, ...rest } = product;
			const ingredientsData = ingredients ?ingredients.map((ingredient) => {
				const { name, id } = ingredient;
				const newId = crypto.randomBytes(16).toString("hex");

				return  {
					ingredient: {
						connectOrCreate: {
							where: { id: id ? id : newId },
							create: { id: newId, name },
						},
					},
				}
			}) : undefined;

			const data: Prisma.ProductCreateInput = {
				name: rest.name,
				description: rest.description,
				imagePath: rest.imagePath,
				price: rest.price,
				ingredients: {
					create: ingredientsData,
				},
				category: {
					connect: {
						id: rest.categoryId
					}
				}
			}

			const createdProduct = await this._clientDatabase.getConnection().product.create({
				data
			});

			return createdProduct;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async update(id: string, product: Product): Promise<Product> {
		try {
			const { ingredients, ...rest } = product;
			const ingredientsData = ingredients ?ingredients.map((ingredient) => {
				const { name, id } = ingredient;
				const newId = crypto.randomBytes(16).toString("hex");

				return  {
					ingredient: {
						connectOrCreate: {
							where: { id: id ? id : newId },
							create: { id: newId, name },
						},
					},
				}
			}) : undefined;

			const data: Prisma.ProductUpdateInput = {
				name: rest.name,
				description: rest.description,
				imagePath: rest.imagePath,
				price: rest.price,
				ingredients: {
					create: ingredientsData
				},
				category: {
					connect: {
						id: rest.categoryId
					}
				}
			}

			const createdProduct = await this._clientDatabase.getConnection().product.update({
				where: {
					id
				},
				data
			});

			return createdProduct;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this._clientDatabase.getConnection().product.update({
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

	async checkIfExists({ id, name }: Product): Promise<boolean> {
		let _product = null;
		if(id) {
			_product = await this._clientDatabase.getConnection().product.findUnique({
				where: {
					id,
					AND: [
						{ name }
					]
				},
				select: {
					id: true
				}
			});
		} else {
			_product = await this._clientDatabase.getConnection().product.findFirst({
				where: {
					name,
				},
				select: {
					id: true
				}
			});
		}

		return _product ? true : false;
	}

	async checkIfExistsById(id: string): Promise<boolean> {
		const _product = await this._clientDatabase.getConnection().product.findUnique({
			where: {
				id
			},
			select: {
				id: true
			}
		});

		return _product ? true : false;
	}

	async addProductToCategory(productId: string, categoryId: string): Promise<Product> {
		try {
			const _product = await this._clientDatabase.getConnection().product.update({
				where: {
					id: productId
				},
				data: {
					categoryId: categoryId
				},
				include: {
					category: true
				}
			});

			return _product;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}

injected(ProductRepository, DATABASE_TOKEN);

export default ProductRepository;
