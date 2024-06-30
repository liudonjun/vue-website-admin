export interface PageLimitDto<T> {
  pageIndex?: number;
  pageSize?: number;
  total?: number;
  result: T
}