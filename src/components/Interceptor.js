import axios from "axios";
import toast from "react-hot-toast";
import getToken from "../HttpService/LocalStorageService";


export const axiosInstance = axios.create({
    baseURL: 'https://shop-api.ngminds.com/'
});

//request interceptor
axiosInstance.interceptors.request.use( (config)=> {

    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('activeToken')}`;

    if(config.url.includes('shop/') || config.url.includes('customers/') ){

      // console.log(config.url);
      if(getToken('activeCustomerToken'))
      config.headers['Authorization'] = `Bearer ${getToken('activeCustomerToken')}`;

    }else {
      if(getToken('activeToken'))
      config.headers['Authorization'] = `Bearer ${getToken('activeToken')}`;

    }
  
    return config;
  });


// response interceptor
axiosInstance.interceptors.response.use( (res) => {

    return res;

  }, function (error) {

    toast.error(error.response?.data.message)
    console.log(error)
    return Promise.reject(error);
  });

  