import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://js-post-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Attach token to request if exists
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // transform data for all response
    return response.data;
  },
  function (error) {
    if (!error.response) throw new Error('Network error. Please try again later!');

    if (error.response.status === 401) {
      // clear token, log out,...
      window.location.assign('/login.html');
      return;
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
