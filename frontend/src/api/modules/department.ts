/*
 * @Author: [吴志远]
 * @Date: 2022-02-21 11:13:12
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-21 14:30:46
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\api\modules\department.ts
 */
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