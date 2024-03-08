// 引入 axios
import axios from 'axios'
import router from '../router/router.js'

const request = axios.create({
    baseURL: "http://localhost:8010/api",
    timeout: 20000,
    withCredentials:true
});

request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.data.code === 40101){
        router.push(
            {
                path:'/login'
            }
        )
    }
    console.log('error'+JSON.stringify(response))
    return response
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    return Promise.reject(error);
});

export {
    request
}
