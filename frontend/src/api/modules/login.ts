/*
 * @Author: [吴志远]
 * @Date: 2022-02-19 10:55:18
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-19 13:04:54
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\api\modules\login.ts
 */
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

