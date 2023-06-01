import { axiosInstance } from "../components/Interceptor";


// var baseUrl = "https://ngminds.herokuapp.com";
// var  baseUrl = "https://shop-api.ngminds.com"

function secureGet(url){
    // const newUrl = baseUrl + url;
    return axiosInstance.get(url);           // pass only httprequest not newurl
}

function securePost(url, data) {

    console.log("in securepost");
//   const newUrl = baseUrl + url;
  return axiosInstance.post(url, data);
}

function patch(url,data){
    return axiosInstance.patch(url, data)
}

function secureDelete(url,id){
    return axiosInstance.delete(`${url}${id}`)
}

function verifyMailId(url){
    

}

export {secureGet, securePost, patch, secureDelete, verifyMailId}