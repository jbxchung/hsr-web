export interface ApiResponse<T> {
  status: boolean;
  payload: T | null;
}