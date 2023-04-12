import instance from '@/api/http'

// 通过id查询视频
export const getVideoOneApi = (param: any)=> instance({
  method: 'get',
  url:`/api/admin_video/query/${param.videoId}`,
})

// 分页条件查询视频
export const queryVideoApi = (param: any) => instance({
  method:'post',
  url:'/api/admin_video/page',
  data:param
})

// 视频添加
export const createVideoApi = (param: any) => instance({
  method:'post',
  url:'/api/admin_video/create',
  data:param
})

// 视频修改
export const modifyVideoApi = (param: any) => instance({
  method:'post',
  url:'/api/admin_video/modify',
  data:param
})

// 视频删除
export const delVideoApi = (param: any) => {
  console.log(param,'参数');
  return instance({
    method:'delete',
    url:`/api/admin_video/delete/[${param.ids}]`,
  })
}

// 标题图片上传
export const videotitleImgUploadApi = (param: any) => instance({
  method:'post',
  url:'/api/video/upload/videotitleImg',
  data:param
})

// 视频文件上传
export const videoUploadApi = (param: any) => instance({
  method:'post',
  url:'/api/video/upload/video',
  data:param
})
