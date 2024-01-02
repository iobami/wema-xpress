import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import config from '../config';
import { getLocalStorage, saveLocalStorage } from './helper';
import { routes } from '../navigation';

const baseURL = config.baseUrl;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
});

export const refreshToken = async (originalRequest: AxiosRequestConfig) => {
  try {
    const token = getLocalStorage(config.tokenKey);
    const url = `${baseURL}/Account/refresh-token?token=${token?.refreshToken}`;

    const { data, ...response } = await axios.post(url);

    if (data.status === 200) {
      // old request and save new token
      saveLocalStorage(data.data, config.tokenKey);

      if (originalRequest && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${data.data?.jwToken}`;
      }

      // console.log('testtt', axios(originalRequest));
      axios(originalRequest);

      return { data, ...response };
    }

    // window.location.href = `${routes.auth.logout.path}?next=${window.location.pathname}`;
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const decodeJwt = (jwt: string) => {
  try {
    return JSON.parse(atob(jwt.split('.')[1]));
  } catch (error) {
    return { sessionId: '' };
  }
};

const onRequest = (request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
  const token = getLocalStorage(config.tokenKey);
  const jwt = token?.jwToken || '';
  const { sessionId } = decodeJwt(jwt);

  if (!request.headers) return request;

  request.headers!.Authorization = `Bearer ${jwt}`;
  request.headers!.signature = sessionId;

  return request;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError) => {
  const originalRequest = error.config;
  const statusCode = error.response!.status;

  if (statusCode === 401) {
    window.location.href = routes.signIn.path;
    return originalRequest;

    // const response = await refreshToken(originalRequest);
    // return response;
  }

  return Promise.reject(error);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
