export interface PaginateContract<T> {
	total: number;
	currentPage: number;
	data: T[];
}
