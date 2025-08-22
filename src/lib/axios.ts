
import config from '@/config/config';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});
