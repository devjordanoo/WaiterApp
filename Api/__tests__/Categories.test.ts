import { Category } from "@models/Category";
import request from 'supertest';
import app from '@/index';
import { PrismaConnection } from '@/singleton';
import { ResetDatabase, CategoriesWithoutProductsSeed, categories as CategoriesMocks } from "@seeds/index"

describe('Categories', () => {
	let categoriesList: any = []

	beforeAll(async () => {
		categoriesList = await CategoriesWithoutProductsSeed(PrismaConnection);
		jest.setTimeout(10000);
	});

	afterAll(async () => {
		await ResetDatabase(PrismaConnection);
	});

  test('GET /categories should return 200 with a list of categories', async () => {
		const response: any = await request(app).get('/api/categories');

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(categoriesList.length);
		expect(response.body.length).toBe(CategoriesMocks.length);
  });

	test('GET /categories/:id should return 200 with a category', async () => {
		const category = categoriesList.find((cat: Category) => cat.name === CategoriesMocks[0].name);
		const response: any = await request(app).get(`/api/categories/${category.id}`);

		expect(response.status).toBe(200);
		expect(response.body.id).toBe(category.id);
		expect(response.body.name).toBe(category.name);
	});

	test('POST /categories should return 201 with a category and create a new category', async () => {
		const newCategory= {
			name: 'New Category',
			icon: '👌',
			products: []
		}
		const response: any = await request(app).post('/api/categories').send(newCategory);

		expect(response.status).toBe(201);
		expect(response.body.name).toBe(newCategory.name);
		expect(response.body.icon).toBe(newCategory.icon);
	});

	test('POST /categories should return 400 with a error message when category name is not valid', async () => {
		const newCategory= {
			icon: '👌',
			products: []
		}
		const response: any = await request(app).post('/api/categories').send(newCategory);

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Request validation failed: 'name' - Required");
	});

	test('PUT /categories/:id should return 200 with a category and update a category', async () => {
		const category = categoriesList.find((cat: Category) => cat.name === CategoriesMocks[0].name);

		const updatedCategory = {
			name: 'Updated Category',
			icon: '👌',
			products: []
		}

		const response: any = await request(app).put(`/api/categories/${category.id}`).send(updatedCategory);

		expect(response.status).toBe(200);
		expect(response.body.name).toBe(updatedCategory.name);
		expect(response.body.icon).toBe(updatedCategory.icon);
	});

	test('PUT /categories/:id should return 400 with a error message when category name is not valid', async () => {
		const category = categoriesList.find((cat: Category) => cat.name === CategoriesMocks[0].name);
		const updatedCategory= {
			icon: '👌',
			products: []
		}
		const response: any = await request(app).put(`/api/categories/${category.id}`).send(updatedCategory);

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Request validation failed: 'name' - Required");
	});

	test('DELETE /categories/:id should return 200 with a message', async () => {
		const category = categoriesList.find((cat: Category) => cat.name === CategoriesMocks[0].name);
		const response: any = await request(app).delete(`/api/categories/${category.id}`);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Category deleted');
	});

});
