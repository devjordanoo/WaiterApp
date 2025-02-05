import ProductRepository from '@/repositories/ProductRepository';
import CategoryRepository from '@/repositories/CategoryRepository';
import { injected } from 'brandi';
import { PRODUCT_REPOSITORIES_TOKEN, CATEGORY_REPOSITORIES_TOKEN } from "@/utils/di/tokens";
import { Product } from "@models/Product";

class ProductUseCases {
	constructor(private _productRepository: ProductRepository, private _categoryRepository: CategoryRepository) {}

    async listProductUseCase(page: number, limit: number, search: string = "") {
        return await this._productRepository.getAll(page, limit, search);
    }

		async getProductByIdUseCase(id: string) {
			const exists = await this._productRepository.checkIfExistsById(id);

			if(!exists) {
				throw new Error("Product not found");
			}

			return await this._productRepository.getById(id);
		}

		async createProductUseCase(product: Product) {
			const exists = await this._productRepository.checkIfExists(product);

			if(exists) {
				throw new Error("Product already exists");
			}

			const category = await this._categoryRepository.checkIfExists(product.categoryId);
			if(!category) {
				throw new Error("Category not found");
			}

			return await this._productRepository.create(product);
		}

		async updateProductUseCase(id: string, product: Product) {
			const exists = await this._productRepository.checkIfExistsById(id);

			if(!exists) {
				throw new Error("Product not found");
			}

			return await this._productRepository.update(id, product);
		}

		async deleteProductUseCase(id: string) {
			const exists = await this._productRepository.checkIfExistsById(id);

			if(!exists) {
				throw new Error("Product not found");
			}

			return await this._productRepository.delete(id);
		}

		async addProductToCategoryUseCase(productId: string, categoryId: string) {
			const exists = await this._productRepository.checkIfExistsById(productId);
			if(!exists) {
				throw new Error("Product not found");
			}

			const categoryExists = await this._categoryRepository.checkIfExists(categoryId);
			if(!categoryExists) {
				throw new Error("Category not found");
			}

			return await this._productRepository.addProductToCategory(productId, categoryId);
		}
}

injected(ProductUseCases, PRODUCT_REPOSITORIES_TOKEN, CATEGORY_REPOSITORIES_TOKEN);

export default ProductUseCases
