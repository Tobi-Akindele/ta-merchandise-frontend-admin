import axios from 'axios';
import { getCurrentUser } from './getCurrentUserDetails';

const BASE_URL = 'http://localhost:9000/api/';
const TOKEN = getCurrentUser();

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
