import { Prisma, PrismaClient } from "@prisma/client";

export const categories = [
	{
		name: 'Seed Category 1',
		icon: '🤷‍♂️',
		products: [1, 2, 3]
	},
	{
		name: 'Seed Category 2',
		icon: '👌',
		products: [1, 2, 3]
	}
];

export const CategoriesWithoutProductsSeed = async (conn: PrismaClient) => {
	const results = await Promise.all(
    categories.map(async (category) => {
      const data: Prisma.CategoryCreateInput = {
        name: category.name,
        icon: category.icon,
      };

      const cat = await conn.category.create({ data });
      return cat;
    })
  );

  return results;
}
