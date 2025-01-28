import { Product } from "@models/Product";

interface ProductRepositoryContract {
	getAll(): Promise<Product[]>;
	getById(id: string): Promise<Product | null>;
	create(product: Product): Promise<Product>;
	update(id: string, product: Product): Promise<Product>;
	delete(id: string): Promise<void>;
	checkIfExists(product: Product): Promise<boolean>;
	checkIfExistsById(id: string): Promise<boolean>;
	addProductToCategory(productId: string, categoryId: string): Promise<Product>;
}

export type { ProductRepositoryContract };
