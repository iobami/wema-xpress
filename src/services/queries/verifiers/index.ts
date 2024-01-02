import { useQuery } from 'react-query';
import api from '../../api';
import queryKey from './keys';
import { VerifiersResponse } from './types';
import config from '../../../config';
import stub from './stub.json';

const BASE_URL = '/verifiers';

export interface Query {
  status?: string;
  searchParams?: string;
  pageNumber?: string | number;
  pageSize?: string | number;
}

const readFn = async (query: Query) => {
  const searchParams = new URLSearchParams(query as Record<string, string>).toString();

  let url = `${BASE_URL}${searchParams ? `?${searchParams}` : ''}`;

  let data = stub;

  if (query.status) {
    data = data.filter((item) => String(item.status) === String(query.status || ''));
  }

  if (query.searchParams) {
    data = data.filter((item) => JSON.stringify(item).includes(query.searchParams || ''));
  }

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Success!');
    }, 1500);
  });

  try {
    await promise;
    await api.get({ url });
    return { data };
  } catch (error) {
    return { data };
  }
};

const useRead = (options = { query: config.queryArgs as Query }) => {
  const query = options.query;

  const hash = [queryKey.read, JSON.stringify(query)];

  const response = useQuery(hash, () => readFn(query), {
    ...options,
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    ...response,
    data: (response.data?.data || []) as VerifiersResponse['data']
  };
};

const queries = { read: useRead };

export default queries;
