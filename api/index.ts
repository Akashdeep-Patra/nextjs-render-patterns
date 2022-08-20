import axios from 'axios';
import { IPost } from './types';

const axiosInstance = axios.create({
  headers: {
    'app-id': process.env.NEXT_PUBLIC_APP_ID as string,
  },
});

export const getPosts = ({ limit = 20, page = 0 } = {}) => {
  return axiosInstance.get<{
    data: Array<IPost>;
    limit: number;
    page: number;
    total: number;
  }>('https://dummyapi.io/data/v1/post', {
    params: {
      limit,
      page,
    },
  });
};

export const getPostDataById = (id: string) =>
  axiosInstance.get<IPost>(`https://dummyapi.io/data/v1/post/${id}`);
