import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import config from '../../../config';
import api from '../../api';
import {
  errorToast, handleErrors, saveLocalStorage, successToast,
} from '../../helper';
import queryKey from './keys';
import { routes } from '../../../navigation';

const BASE_URL = '/auth';

const useCreate = (options = {}) => {
  const navigate = useNavigate();

  const {
    mutate, isLoading, data, isSuccess,
  } = useMutation(api.post, {
    mutationKey: [queryKey.create],
    ...options,
    onSuccess: (response: any) => {
      if (response.succeeded) {
        successToast(response.message || 'Registration successful');

        setTimeout(() => navigate(routes.signIn.path), 3000);
      }
    },
    onError: (err: any) => {
      errorToast(handleErrors(err));
    },
  });

  type Body = {
    firstName: string;
    lastName: string;
    otherName?: string;
    phoneNumber?: string;
    offlinePassword: string;
    confirmOfflinePassword?: string;
    branchId?: string;
    token: string;
  }

  return {
    mutate: (body: Body) => mutate({ url: `${BASE_URL}/register-invited-user`, body, auth: false }),
    isLoading,
    data,
    isSuccess,
  };
};

type Request = {
  url: string;
  body?: any;
  auth?: boolean;
};

const useLogin = (options = {}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    successToast('Sign in successful');

    setTimeout(() => navigate(routes.dashboard.entry.path), 1000);
  };

  const {
    mutate, isLoading, data, isSuccess,
  } = useMutation(async (args: Request) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Success!');
      }, 1500);
    });

    await promise;

    return api.post(args)
  }, {
    mutationKey: [queryKey.login],
    ...options,
    onSuccess: (response: any) => {
      if (response.succeeded) {
        saveLocalStorage(response.data, config.tokenKey);

        successToast('Sign in successful');

        setTimeout(() => navigate(routes.dashboard.entry.path), 1000);
      }
    },
    onError: (err: any) => {
      handleLogin();
      false && errorToast(handleErrors(err));
    },
  });
  return {
    mutate: (body: any) => mutate({ url: `${BASE_URL}/login`, body, auth: false }),
    isLoading,
    data,
    isSuccess,
  };
};

const useLogout = (options = {}) => {
  const response = useQuery(
    [queryKey.logout],
    () => api.get({ url: `${BASE_URL}/logout` }),
    {
      ...options,
      onSuccess: () => {},
      onError: () => {},
    },
  );

  return response;
};

const queries = { create: useCreate, login: useLogin, logout: useLogout };

export default queries;
