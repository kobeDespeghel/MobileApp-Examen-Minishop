export default interface ApiResponse<T> {
  data: T;
  total: number;
  skip: number;
  limit: number;
}
