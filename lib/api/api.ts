import axios from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HANDLERS_URL,
  withCredentials: true,
});
