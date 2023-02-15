/*
 * @Author: [吴志远]
 * @Date: 2022-02-21 11:13:12
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-21 14:30:57
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\api\modules\user.ts
 */
import instance from '@/api/http'

// 通过id查询用户
export const getUserOneApi = (param: any)=> instance({
  method: 'get',
  url:`/api/user/query/${param.userId}`,
})

// 查询所有用户
export const getAllUserApi = () => instance({
  method:'get',
  url:'/api/user/queryAll',
})

// 分页条件查询用户
export const queryUserApi = (param: any) => instance({
  method:'post',
  url:'/api/user/page',
  data:param
})

// 用户添加
export const createUserApi = (param: any) => instance({
  method:'post',
  url:'/api/user/create',
  data:param
})

// 用户修改
export const modifyUserApi = (param: any) => instance({
  method:'post',
  url:'/api/user/modify',
  data:param
})

// 用户删除
export const delUserApi = (param: any) => {
  console.log(param,'参数');
  return instance({
    method:'delete',
    url:`/api/user/delete/[${param.ids}]`,
  })
}


// 用户密码修改
export const modifyPassApi = (param: any) => instance({
  method:'post',
  url:'/api/user/password/modify',
  data:param
})

// 用户状态修改
export const modifyStatusApi = (param: any) => instance({
  method:'get',
  url:`/api/user/status/modify/${param.userId}`,
})

// 用户头像上传
export const userAvatarUploadApi = (param: any) => instance({
  method:'post',
  url:'/api/user/upload',
  data:param
})