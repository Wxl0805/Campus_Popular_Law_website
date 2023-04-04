import instance from '@/api/http'

// 用户注册
export const registerApi = (param: any) => instance({
  method:'post',
  url:'/api/login_register/register',
  data:param
})

// 用户登录
export const loginApi = (param: any) => instance({
  method:'post',
  url:'/api/login_register/login',
  data:param
})

