export interface ApiResponse<T> {
  errorMessage?: string | null;
  statusCode?: number;
  data: T | null;
}
