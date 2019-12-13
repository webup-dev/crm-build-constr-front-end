import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000
});

const getAuthToken = () => localStorage.token;

const authInterceptor = (config) => {
  config.headers['Accept'] = 'application/json';
  config.headers['Authorization'] = 'Bearer ' + getAuthToken();
  return config;
};

httpClient.interceptors.request.use(authInterceptor);

export default httpClient;
