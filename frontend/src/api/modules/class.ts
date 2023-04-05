import instance from '@/api/http'

// 获取所有班级
export const getAllClassApi = () => instance({
  method:'get',
  url:'/api/class/queryAll',
})

//班级分页查询
export const queryClassApi = (param: any) => instance({
  method:'post',
  url:'/api/class/page',
  data:param
})

export const createClassApi = (param: any) => instance({//班级添加
  method:'post',
  url:'/api/class/create',
  data:param
})

export const modifyClassApi = (param: any) => instance({//班级修改
  method:'post',
  url:'/api/class/modify',
  data:param
})

export const delClassApi = (param: any) => instance({//班级删除
  method:'delete',
  url:`/api/class/delete/[${param.ids}]`,
})