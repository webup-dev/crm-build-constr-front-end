import axios from 'axios'

const httpClient2 = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000, // indicates, 1000ms ie. 1 second
});

const getAuthToken = () => localStorage.token;

const authInterceptor = (config) => {
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'multipart/form-data';
  config.headers['Authorization'] = 'Bearer ' + getAuthToken();
  return config;
};

httpClient2.interceptors.request.use(authInterceptor);

export default httpClient2;
