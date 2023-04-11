import instance from '@/api/http'

// 通过id查询文章
export const getArticleOneApi = (param: any)=> instance({
  method: 'get',
  url:`/api/admin_article/query/${param.id}`,
})

// 分页条件查询文章
export const queryArticleApi = (param: any) => instance({
  method:'post',
  url:'/api/admin_article/page',
  data:param
})

// 文章添加
export const createArticleApi = (param: any) => instance({
  method:'post',
  url:'/api/admin_article/create',
  data:param
})

// 文章修改
export const modifyArticleApi = (param: any) => instance({
  method:'post',
  url:'/api/admin_article/modify',
  data:param
})

// 文章删除
export const delArticleApi = (param: any) => {
  console.log(param,'参数');
  return instance({
    method:'delete',
    url:`/api/admin_article/delete/[${param.ids}]`,
  })
}

// 标题图片上传
export const articletitleImgUploadApi = (param: any) => instance({
  method:'post',
  url:'/api/article/upload/titleImg',
  data:param
})
