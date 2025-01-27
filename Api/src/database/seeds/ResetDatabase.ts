import { PrismaClient } from "@prisma/client";

export const ResetDatabase = async (conn: PrismaClient) => {
	await conn.category.deleteMany();
}
