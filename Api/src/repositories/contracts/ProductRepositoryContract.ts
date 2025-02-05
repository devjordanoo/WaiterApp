import { Product } from "@models/Product";
import { PaginateContract } from "@repositories/contracts/PaginateContract";

interface ProductRepositoryContract {
	getAll(page: number, limit: number, search: string): Promise<PaginateContract<Product>>;
	getById(id: string): Promise<Product | null>;
	create(product: Product): Promise<Product>;
	update(id: string, product: Product): Promise<Product>;
	delete(id: string): Promise<void>;
	checkIfExists(product: Product): Promise<boolean>;
	checkIfExistsById(id: string): Promise<boolean>;
	addProductToCategory(productId: string, categoryId: string): Promise<Product>;
}

export type { ProductRepositoryContract };
