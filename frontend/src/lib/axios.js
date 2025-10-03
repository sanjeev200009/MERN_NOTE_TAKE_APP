import axios from "axios";

// Use relative URL in production, full URL in development
const baseURL = import.meta.env.PROD 
  ? '/api'  // In production, use relative path since frontend and backend are served from same domain
  : 'http://localhost:5000/api';  // In development, use full URL

const instance = axios.create({
  baseURL: baseURL
});

export default instance;
