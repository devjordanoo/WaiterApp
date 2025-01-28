import { z } from 'zod';
import { Product } from "@models/Product";
import ValidatorContract from "./contracts/ValidatorContract";

class ProductValidator implements ValidatorContract {
	schema = z.object({
		name: z.string().min(1).nonempty("Name is required"),
		description: z.string().max(100).optional(),
		imagePath: z.string().min(1).nonempty().optional(),
		price: z.number().min(1).nonnegative(),
		categoryId: z.string().min(1).nonempty(),
		ingredients: z.array(
			z.object({
				id: z.string().min(1).nonempty().optional(),
				name: z.string().min(1).nonempty(),
			})
		).min(1).nonempty(),
		orders: z.array(z.string().nonempty()).min(1).nonempty().optional(),
	});

	validate(product: Product): void {
		this.schema.parse(product);
	}
}

export default new ProductValidator();
