import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'context/AxiosInterceptor';

const responseBody = (response: AxiosResponse) => response?.data;

export const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: any, config: AxiosRequestConfig = {}) =>
    axios.post(url, body, config).then(responseBody),
  put: (url: string, body: any) => axios.put(url, body).then(responseBody),
  delete: (url: string, body: any) =>
    axios
      .delete(url, {
        data: { ...body },
      })
      .then(responseBody),
};

const httpClient = {};

export default httpClient;
