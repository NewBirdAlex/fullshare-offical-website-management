import axios from 'axios';
import config from './config'
axios.defaults.baseURL = config.path;
//check user have login
if(localStorage.getItem('user')){

  axios.defaults.headers.common['Authorization'] =JSON.parse(localStorage.getItem('user')).accessToken||'';

}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if(response.data.code === 200) return response.data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default axios;