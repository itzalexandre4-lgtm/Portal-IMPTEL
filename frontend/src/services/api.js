import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Apenas a base!
});

export default api;