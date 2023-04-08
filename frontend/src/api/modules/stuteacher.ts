import instance from '@/api/http'

// 查询所有用户
export const getAllUserApi = () => instance({
  method:'get',
  url:'/api/stuteacher/queryAll',
})

// 分页条件查询用户
export const queryUserApi = (param: any) => instance({
  method:'post',
  url:'/api/stuteacher/page',
  data:param
})

// 用户添加
export const createUserApi = (param: any) => instance({
  method:'post',
  url:'/api/stuteacher/create',
  data:param
})

// 用户修改
export const modifyUserApi = (param: any) => instance({
  method:'post',
  url:'/api/stuteacher/modify',
  data:param
})


// 用户密码修改
export const modifyPassApi = (param: any) => instance({
  method:'post',
  url:'/api/stuteacher/password/modify',
  data:param
})

// 用户状态修改
export const modifyStatusApi = (param: any) => instance({
  method:'get',
  url:`/api/stuteacher/status/modify/${param.userId}`,
})

// 查找对应班级
export const queryClass = (param: any) => instance({
  method:'get', 
  url:`/api/stuteacher/queryClass/${param.classId}`,
})