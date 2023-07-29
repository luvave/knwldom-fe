import { type AxiosError, type AxiosRequestConfig } from 'axios';
import apiClient from './apiClient';

export const apiClientInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return apiClient({ ...config }).then(({ data }) => data);
};

export default apiClientInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
