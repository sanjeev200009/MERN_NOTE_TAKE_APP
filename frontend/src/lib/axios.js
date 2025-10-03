import axios from "axios";

// Use Netlify Functions in production, localhost in development
const baseURL = import.meta.env.PROD 
  ? '/.netlify/functions/api'  // Netlify Functions path
  : 'http://localhost:5000/api';  // In development, use full URL

const instance = axios.create({
  baseURL: baseURL
});

export default instance;
