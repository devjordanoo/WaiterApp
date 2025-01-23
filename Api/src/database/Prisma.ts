import { DatabaseContract } from "./contracts/DatabaseContract";
import { PrismaClient } from "@prisma/client";

class PrismaDatabase implements DatabaseContract<PrismaClient> {
	private client: PrismaClient;
	constructor() {
		this.client = new PrismaClient();
	}
	async getConnection(): Promise<PrismaClient> {
		return this.client;
	}
  async connect(): Promise<void> {
    await this.client.$connect();
  }
}

export default new PrismaDatabase();
