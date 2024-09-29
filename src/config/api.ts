import { BaseResponse } from 'types/common';
import { requests } from './axios';
import { WeatherAPIResponse } from 'views/types';

export const weatherAPI = {
  getRealtimeWeather: (
    query: string
  ): Promise<BaseResponse<WeatherAPIResponse>> =>
    requests.get(`/current.json?q=${query}`),
};
