import instance from '@/api/http'

// 通过id查询留言
export const getMessageOneApi = (param: any)=> instance({
  method: 'get',
  url:`/api/admin_message/query/${param.id}`,
})

// 分页条件查询留言
export const queryMessageApi = (param: any) => instance({
  method:'post',
  url:'/api/admin_message/page',
  data:param
})

// 留言删除
export const delMessageApi = (param: any) => {
  return instance({
    method:'delete',
    url:`/api/admin_message/delete/[${param.ids}]`,
  })
}
