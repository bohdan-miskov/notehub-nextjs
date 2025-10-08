import axios from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_ROUTE_HANDLERS_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
  withCredentials: true,
});
