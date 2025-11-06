import axios from 'axios';
import { config } from '../../config';

const xsrfToken = getCookie('XSRF-TOKEN');
const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const imageApi = {
  getImages: async (folder: string) => {
    const response = await api.get('/list', { params: { folder: folder },
       headers: {
        'Content-Type': 'multipart/form-data'
      } });
    return response.data;
  },
  uploadImages: async (formData: any) => {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

};
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(';').shift()!);
  return null;
}

