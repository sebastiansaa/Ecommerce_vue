import type { AxiosResponse } from 'axios';

export interface HttpClient {
  get<T>(url: string, config?: any): Promise<AxiosResponse<T>>
  post<T>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>>
  put<T>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>>
  delete<T>(url: string, config?: any): Promise<AxiosResponse<T>>
}
