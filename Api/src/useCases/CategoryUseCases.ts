import CategoryRepository from "@repositories/CategoryRepository";
import { injected } from 'brandi';
import { CATEGORY_REPOSITORIES_TOKEN } from "@/utils/di/tokens";
import { Category } from "@models/Category";

class CategoryUseCases {
	constructor(private _categoryRepository: CategoryRepository) {}

    async listCategoryUseCase() {
        return await this._categoryRepository.getAll();
    }

		async createCategoryUseCase(category: Category) {
			console.log("UseCase: ", category)
			return await this._categoryRepository.create(category);
		}
}

injected(CategoryUseCases, CATEGORY_REPOSITORIES_TOKEN);

export default CategoryUseCases
