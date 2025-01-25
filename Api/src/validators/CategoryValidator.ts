import { z } from 'zod';
import { Category } from "@models/Category";
import ValidatorContract from "./contracts/ValidatorContract";

class CategoryValidator implements ValidatorContract {
	schema = z.object({
		name: z.string().min(1),
		icon: z.string().min(1),
		products: z.array(z.string()).optional(),
	});

	validate(category: Category): void {
		this.schema.parse(category);
	}
}

export default new CategoryValidator();
