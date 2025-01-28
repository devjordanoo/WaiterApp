import CategoryRepository from "@repositories/CategoryRepository";
import { injected } from 'brandi';
import { CATEGORY_REPOSITORIES_TOKEN } from "@/utils/di/tokens";
import { Category } from "@models/Category";

class CategoryUseCases {
	constructor(private _categoryRepository: CategoryRepository) {}

    async listCategoryUseCase() {
        return await this._categoryRepository.getAll();
    }

		async getCategoryByIdUseCase(id: string) {
			return await this._categoryRepository.getById(id);
		}

		async createCategoryUseCase(category: Category) {
			return await this._categoryRepository.create(category);
		}

		async updateCategoryUseCase(id: string, category: Category) {
			const exists = await this._categoryRepository.checkIfExists(id);

			if(!exists) {
				throw new Error("Category not found");
			}

			if(await this._categoryRepository.checkIfCategoryHaveProducts(id)) {
				throw new Error("Category have products, you can't update it");
			}

			return await this._categoryRepository.update(id, category);
		}

		async deleteCategoryUseCase(id: string) {
			const checkIfCategoryHaveProducts = await this._categoryRepository.checkIfCategoryHaveProducts(id);

			if(checkIfCategoryHaveProducts) {
				throw new Error("Category have products, you can't delete it");
			}

			return await this._categoryRepository.delete(id);
		}
}

injected(CategoryUseCases, CATEGORY_REPOSITORIES_TOKEN);

export default CategoryUseCases
