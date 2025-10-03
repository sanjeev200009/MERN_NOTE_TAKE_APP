import axios from "axios";

// Use /api in production (redirected to Netlify Functions), localhost in development
const baseURL = import.meta.env.PROD 
  ? '/api'  // This will be redirected to /.netlify/functions/api
  : 'http://localhost:5000/api';  // In development, use full URL

const instance = axios.create({
  baseURL: baseURL
});

export default instance;
