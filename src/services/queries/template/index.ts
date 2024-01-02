import { useMutation, useQuery } from 'react-query';
import api from '../../api';
import { errorToast, handleErrors, successToast } from '../../helper';
import queryKey from './keys';

const BASE_URL = '/template';

const useCreate = (options = {}) => {
  const {
    mutate, isLoading, data, isSuccess,
  } = useMutation(api.post, {
    mutationKey: [queryKey.create],
    ...options,
    onSuccess: () => {
      successToast('');
    },
    onError: (err: any) => {
      errorToast(handleErrors(err));
    },
  });
  return {
    mutate: (body: any) => mutate({ url: `${BASE_URL}`, body }),
    isLoading,
    data,
    isSuccess,
  };
};

const useRead = (options = {}) => {
  const response = useQuery([queryKey.read], () => api.get({ url: `${BASE_URL}` }), {
    ...options,
    onSuccess: () => {},
    onError: () => {},
  });

  return response;
};

const queries = { create: useCreate, read: useRead };

export default queries;
