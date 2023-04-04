import instance from '@/api/http'

// 获取所有部门
export const getAllDepartmentApi = () => instance({
  method:'get',
  url:'/api/department/queryAll',
})

//部门分页查询
export const queryDepartmentApi = (param: any) => instance({
  method:'post',
  url:'/api/department/page',
  data:param
})

export const createDepartmentApi = (param: any) => instance({//部门添加
  method:'post',
  url:'/api/department/create',
  data:param
})

export const modifyDepartmentApi = (param: any) => instance({//部门修改
  method:'post',
  url:'/api/department/modify',
  data:param
})

export const delDepartmentApi = (param: any) => instance({//部门删除
  method:'delete',
  url:`/api/department/delete/[${param.ids}]`,
})