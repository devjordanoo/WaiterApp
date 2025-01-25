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
			return await this._categoryRepository.update(id, category);
		}

		async deleteCategoryUseCase(id: string) {
			return await this._categoryRepository.delete(id);
		}
}

injected(CategoryUseCases, CATEGORY_REPOSITORIES_TOKEN);

export default CategoryUseCases
