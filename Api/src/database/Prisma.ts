import { DatabaseContract } from "./contracts/DatabaseContract";
import { PrismaClient } from "@prisma/client";

class PrismaDatabase implements DatabaseContract {
	private client: PrismaClient;
	constructor() {
		this.client = new PrismaClient();
	}
	getConnection(): PrismaClient {
		return this.client;
	}
  async connect(): Promise<void> {
    await this.client.$connect();
  }
}

export default PrismaDatabase;
