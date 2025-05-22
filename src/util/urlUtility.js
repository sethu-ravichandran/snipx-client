import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3500';
const API_ENDPOINT = `${BACKEND_URL}/api`;

export const shortenUrl = async (originalUrl) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/shorten`, { originalUrl });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to shorten URL');
    }
    throw new Error('Network error occurred');
  }
};

export const getUrls = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/urls`);
    return response.data;
  } catch (error) {
    console.error('Error fetching URLs:', error);
    throw new Error('Failed to fetch URLs');
  }
};
