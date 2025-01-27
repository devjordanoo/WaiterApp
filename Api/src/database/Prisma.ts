import { DatabaseContract } from "./contracts/DatabaseContract";
import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient();

class PrismaDatabase implements DatabaseContract {
	private client: PrismaClient;
	constructor() {
		this.client = client;
	}
	getConnection(): PrismaClient {
		return this.client;
	}
  async connect(): Promise<void> {
    await this.client.$connect();
  }

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}

	async resetDatabase(): Promise<void> {
		await this.client.category.deleteMany();
	}
}

export default PrismaDatabase
