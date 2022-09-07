import { IPost } from './types';

// Implementation code where T is the returned data shape
export const apiInstance = {
  get: async <T>(url: string, delay = 1000): Promise<T> => {
    const [response] = await Promise.all([
      fetch(url, {
        headers: {
          'app-id': process.env.NEXT_PUBLIC_APP_ID as string,
        },
      }),
      new Promise((res) => setTimeout(res, delay)),
    ]);
    return response.json();
  },
};

export const getPosts = ({ limit = 20, page = 0 } = {}) => {
  return apiInstance.get<{
    data: Array<IPost>;
    limit: number;
    page: number;
    total: number;
  }>(`https://dummyapi.io/data/v1/post?limit=${limit}&page=${page}`);
};

export const getPostDataById = (id: string) =>
  apiInstance.get<IPost>(`https://dummyapi.io/data/v1/post/${id}`);

const cache: Record<string, any> = {};

export function useData<T>(key: string, fetcher: () => Promise<T>) {
  if (!cache[key]) {
    let data: T;
    let error: any;
    let promise: Promise<any>;
    cache[key] = () => {
      if (error !== undefined || data !== undefined) return { data, error };
      if (!promise) {
        promise = fetcher()
          .then((r) => (data = r))
          // Convert all errors to plain string for serialization
          .catch((e) => (error = e + ''));
      }
      throw promise;
    };
  }
  return cache[key]();
}

export enum SuspendedState {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export function useSuspendedFetch<T = any>(promise: Promise<T>) {
  let status: SuspendedState = SuspendedState.PENDING;
  let result: T;
  let error: any;
  let suspender = promise.then(
    (r: T) => {
      status = SuspendedState.SUCCESS;
      result = r;
    },
    (e: any) => {
      status = SuspendedState.ERROR;
      error = e;
    }
  );
  return {
    read() {
      if (status === SuspendedState.PENDING) {
        throw suspender;
      } else if (status === SuspendedState.ERROR) {
        throw error;
      } else if (status === SuspendedState.SUCCESS) {
        return result;
      }
    },
  };
}
