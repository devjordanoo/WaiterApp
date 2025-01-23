interface DatabaseContract<T> {
  connect(): Promise<void>;
	getConnection(): Promise<T>;
}

export type { DatabaseContract };
