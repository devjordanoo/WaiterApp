import { DatabaseContract } from "./contracts/DatabaseContract";
import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient();

class PrismaDatabase implements DatabaseContract {
	private client: PrismaClient;
	constructor() {
		this.client = client;
		this.setupDatabase();
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

	private async setupDatabase(): Promise<void> {
			this.client.$use(async (params, next) => {
					const FUNCTIONS_TO_CHECK = [
							'findUnique',
							'findUniqueOrThrow',
							'findMany',
							'findFirst',
							'findFirstOrThrow',
							'count',
							'groupBy'
					];

					if(params.args?.where) {
							if(FUNCTIONS_TO_CHECK.includes(params.action)) {
									params.args.where = {
											...params.args.where,
											active: true,
									};
							}
					}

					return next(params);
			});
	}
}

export default PrismaDatabase
