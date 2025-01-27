import { PrismaClient } from "@prisma/client";

interface DatabaseContract {
  connect(): Promise<void>;
	getConnection(): PrismaClient;
	disconnect(): void;
	resetDatabase(): Promise<void>;
}

export type { DatabaseContract };
