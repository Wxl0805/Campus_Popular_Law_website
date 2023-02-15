/*
 * @Author: [吴志远]
 * @Date: 2022-02-21 11:13:12
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-22 10:21:56
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\api\modules\role.ts
 */
import instance from "../http";

// 获取所有角色
export const getAllRoleApi = () => instance({
  method:'get',
  url:'/api/role/queryAll',
})

// 角色添加
export const createRoleApi = (param: any) => instance({
  method:'post',
  url:'/api/role/create',
  data:param
})

// 角色修改
export const modifyRoleApi = (param: any) => instance({
  method:'post',
  url:'/api/role/modify',
  data:param
})

// 角色删除
export const delRoleApi = (param: any) => instance({
  method:'delete',
  url:`/api/role/delete/[${param.ids}]`,
})

// 查询角色权限
export const getRoleAuthorityApi = (param: any) => instance({
  method:'get',
  url:`/api/role/authority/query/${param.roleId}`,
})

// 修改角色权限
export const modifyRoleAuthorityApi = (param: any) => instance({
  method:'post',
  url:'/api/role/authority/modify',
  data: param
})
