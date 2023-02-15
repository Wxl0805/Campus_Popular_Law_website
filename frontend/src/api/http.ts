import axios from 'axios';
import { ElMessage, ElMessageBox } from "element-plus"
import router from '@/router';
// 环境的切换
if (process.env.NODE_ENV == 'development') {
    // axios.defaults.baseURL = '/apis'
} else if (process.env.NODE_ENV == 'debug') {
    // axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '';
}

// 用来计算同一段时间内请求发送的个数
let count = 0
// 标识位，用于控制多个请求同时返回错误时，只展示一条提示
let flag = false

// 创建 axios 实例
const instance  = axios.create({
  timeout: 5000
})

// 设置 post、put 默认 Content-Type
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.put['Content-Type'] = 'application/json'

// 设置请求和响应错误处理
const error = (err:any) => {
  if(count > 0 && flag === false) {
    if (err.response) {
      const { status } = err.response
      if (status === 401) {
        ElMessage.error('401 访问被拒绝！');
        router.replace('/login');
      } else if (status === 403) {
        ElMessage.error('403 资源不可用！')
        router.push('/403');
      } else if (status === 404) {
        ElMessage.error('404 找不到页面！')
        router.push('/404');
      } else if (status === 405) {
        ElMessage.error('405 不允许此方法！')
      } else if (status === 500) {
        ElMessage.error('500 服务内部错误！')
        router.push('/500');
      } else if (status === 503) {
        ElMessage.error('503 服务过载！');
      } else {
        ElMessage.error('未知错误！');
      }
    }
    flag = true;
  }
  count--;
  if(count === 0) {
    flag = false;
  }
  // 返回输出错误
  return Promise.reject(err)
}

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // @ts-ignore
    config.headers['Authorization'] = token?token:'';
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data)
    }
    count++;
    // 请求发送前进行处理
    return config;
  }, error)

// 添加响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    // if(response.headers.nonce || response.config.url=='/api/security/v1/auth/login' || response.config.url.includes('/api/develop/v1/attachment/download')){
    //   return response;
    // }
    const { data } = response;
    if(data.code !== '0000000' && data.code != '1000000') {
      ElMessage.error(data.msg || data.message);
    }else if(data.code === '1000000') {
      localStorage.removeItem('token');
      localStorage.removeItem('vuex');
      localStorage.removeItem('userName');  
      ElMessage.error(data.msg || data.message);
      router.replace('/login');
    }
    count--
    if(count === 0) {
      flag = false;
    }
    return response.data;
  }, error)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default instance
