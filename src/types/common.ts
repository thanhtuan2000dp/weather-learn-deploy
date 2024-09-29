export interface BaseResponse<T> {
  data: T;
  title: string;
  result: boolean;
  errors: string[];
  message: string;
  data_error: any[];
  code_status: number;
}
