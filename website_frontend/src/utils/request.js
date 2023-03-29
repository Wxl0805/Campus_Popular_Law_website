// 在request.js中引入axios
import axios from 'axios'; // 引入axios
import { ElNotification } from 'element-plus' // 提示信息
import store from '@/store/index';

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.getters.getToken;
        token && (config.headers.authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {
            if (response.data.code == 7 || response.data.code == "7") {
                ElNotification({
                    message: response.data.message || response.data.msg,
                    duration: 2000,
                    type: 'error',
                    title: 'Error',
                });
            }
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        // console.log(router);
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    ElNotification({
                        message: '未登录，请先登录',
                        duration: 2000,
                        type: 'error',
                        title: 'Error',
                    });
                    break;

                    // 403 token过期
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面                
                case 403:
                    ElNotification({
                        message: '登录过期，请重新登录',
                        duration: 2000,
                        type: 'error',
                        title: 'Error',
                    });
                    // 清除token
                    store.commit('delToken');
                    store.commit('info');
                    break;

                    // 404请求不存在
                case 404:
                    ElNotification({
                        message: '网络请求不存在',
                        duration: 2000,
                        type: 'error',
                        title: 'Error',
                    });
                    break;
                    // 其他错误，直接抛出错误提示
                default:
                    ElNotification({
                        message: error.response.data.message,
                        duration: 2000,
                        type: 'error',
                        title: 'Error',
                    });
            }
            return Promise.reject(error.response);
        }
    }
);

export default axios;