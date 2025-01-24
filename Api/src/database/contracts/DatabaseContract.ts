import { PrismaClient } from "@prisma/client";

interface DatabaseContract {
  connect(): Promise<void>;
	getConnection(): PrismaClient;
}

export type { DatabaseContract };
