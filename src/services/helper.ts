import { Id, toast } from 'react-toastify';
import config from '../config';

export const errorToast = (message = 'Something went wrong', toastId?: Id) => {
  toast.error(message, {
    toastId,
  });
};

export const successToast = (message = 'Successful', toastId?: Id) => {
  toast.success(message, { toastId });
};

export const saveLocalStorage = (data: any, key: string) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    return false;
  }
};

export const getLocalStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
};

export const checkToken = () => {
  const token = getLocalStorage(config.tokenKey);

  return !!token;
};

export const getQueryKeys = (namespace: string) => ({
  create: `${namespace}/create`,
  read: `${namespace}/read`,
  readOne: `${namespace}/readOne`,
  update: `${namespace}/update`,
  patch: `${namespace}/patch`,
  put: `${namespace}/put`,
  delete: `${namespace}/delete`,
});

export function handleErrors(err: any) {
  const { response, message } = err;
  const { data } = response;

  if (!data) return message;

  const errorMessage: string = data?.message || 'Something went wrong';

  return errorMessage;
}
