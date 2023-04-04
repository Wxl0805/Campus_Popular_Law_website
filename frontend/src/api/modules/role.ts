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
