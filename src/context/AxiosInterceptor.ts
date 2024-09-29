import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30 * 1000,
  headers: {
    language: 'vi',
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.NEXT_PUBLIC_WEATHER_KEY,
  },
});

const AxiosInterceptor = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reqInterceptor = (config: any) => {
      //   const storedToken = window.localStorage.getItem(
      //     constants.storageTokenKeyName
      //   )!;
      //   const storedSelectedCompany = JSON.parse(
      //     window.localStorage.getItem(constants.storageLastCompanySelected)!
      //   );

      //   config.headers.gis = process.env.NEXT_PUBLIC_GIS;
      //   config.headers.package = process.env.NEXT_PUBLIC_PACKAGE;

      //   if (storedToken) {
      //     config.headers.authorization = `Token ${storedToken}`;
      //   }

      //   if (storedSelectedCompany && storedSelectedCompany.license) {
      //     config.headers.license = `${storedSelectedCompany.license}`;
      //   }

      return config;
    };

    const resInterceptor = (response: AxiosResponse) => {
      //   if (
      //     [
      //       constants.CODE_LOST_PERMISSION_PLACE,
      //       constants.CODE_LICENSE_EXPIRED,
      //       constants.CODE_LOST_PERMISSION_COMPANY,
      //     ].includes(response.data.code_status)
      //   ) {
      //     // Handle case license of company is expire
      //     toast.error(response.data.message);
      //     window.localStorage.removeItem(constants.storageLastCompanySelected);
      //     router.replace('/select-company');
      //   }

      return response;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errInterceptor = (error: AxiosError | any) => {
      if (axios.isCancel(error)) {
        return Promise.reject('Request canceled');
      }
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        return Promise.reject(error);
      }
      if (error.code === 'ERR_BAD_REQUEST') {
      }
      if (error.code === 'ERR_NETWORK') {
        return Promise.reject(error);
      }

      if (error.response.status === 401) {
      }

      const axiosErrorResponse: AxiosError = error.response;

      return Promise.reject(axiosErrorResponse);
    };

    const reqInterceptorConfig =
      instance.interceptors.request.use(reqInterceptor);
    const resInterceptorConfig = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptorConfig);
      instance.interceptors.response.eject(resInterceptorConfig);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
