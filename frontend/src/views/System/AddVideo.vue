<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="gva-search-box" style="position: relative;">
          <el-form ref="searchForm" :model="searchInfo" :rules="rules">
            <el-form-item label="标题" prop="title">
              <el-input v-model="searchInfo.title" placeholder="请输入视频标题" @change="onTitleInputChange"> </el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="searchInfo.author" placeholder="请输入视频作者" @change="onAuthorInputChange"> </el-input>
            </el-form-item>
            <el-form-item label="选择封面图" prop="videoTitleImg">
              <el-upload
                class="videoTitleImg"
                action="#"
                :show-file-list="false"
                :http-request="testUpload"
                :before-upload="beforeUpload"
              >
                <img
                  v-if="searchInfo.videoTitleImg"
                  :src="searchInfo.videoTitleImg"
                  class="videoTitleImg"
                >
                <i
                  v-else
                  class="fa-plus"
                ></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="请上传视频" prop="videoUrl">
              <el-upload
                class="avatar-uploader"
                action="#"
                :http-request="videoUpload"
                :on-progress="uploadVideoProcess"
                :on-success="handleVideoSuccess"
                :before-upload="beforeUploadVideo"
                :show-file-list="false"
              >
                <video
                  v-if="searchInfo.videoUrl != '' && !videoFlag"
                  :src="searchInfo.videoUrl"   
                  class="avatar video-avatar"
                  controls="controls">
                </video>
                <i v-else="searchInfo.videoUrl == '' && !videoFlag" 
                  class="fa-plus avatar-uploader-icon"
                ></i>
                <el-progress v-if="videoFlag == true" type="circle"
                  :percentage="videoUploadPercent"
                  style="margin-top: 7px">
                </el-progress>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(searchForm)">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup> 
  import { onBeforeUnmount, ref, reactive, shallowRef } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { createVideoApi, videotitleImgUploadApi, videoUploadApi } from "@/api/modules/video";
  import { ElMessage } from "element-plus";
  import axios from "axios";
  // const user = useUserStore();
  const route = useRoute(); //路由参数
  const router = useRouter(); //跳转路由
  // 表单验证规则
  const rules = reactive({
    title: [
      {
        required: true,
        message: "请输入视频标题",
        trigger: "change",
      },
    ],
    author: [
      {
        required: true,
        message: "请输入视频作者",
        trigger: "change",
      },
    ],
    videoTitleImg: [
      {
        required: true,
        message: "请上传封面图片",
        trigger: "change",
      },
    ],
    videoUrl: [
      {
        required: true,
        message: "请上传视频",
        trigger: "change",
      },
    ],
  });
  // formRef
  const searchForm = ref();
  const searchInfo = reactive({
    title: '',
    author: '',
    videoTitleImg: '',
    videoUrl: ''
  });

  const videoFlag = ref(false);
  //是否显示进度条
  const videoUploadPercent = ref('')
  //进度条的进度，
  const isShowUploadVideo = ref(false);

  // 图片上传之前
  const beforeUpload = (file) => {
      const type = file.type.split("/")[1].toLowerCase();
      const isPic = ["jpeg", "png", "gif", "jpg", "webp", "svg"];
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isPic.includes(type)) {
        ElMessage.error("上传图片只能是 " + isPic + " 格式!");
      }
      if (!isLt3M) {
        ElMessage.error("上传头像图片大小不能超过 3MB!");
      }
      return isPic && isLt3M;
    };

  // 上传图片
  const testUpload = async(item) => {
    let formData = new FormData();
      formData.append("image", item.file);
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:3000/api/video/upload/videoTitleImg",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (res.data.code === "0000000") {
        searchInfo.videoTitleImg = res.data.filename;
      } else {
        ElMessage.error("上传失败");
      }
  };
  // 顶部输入信息相关
  const onTitleInputChange = () => {};
  const onAuthorInputChange = () => {};
  
  const onSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        createVideoApi({title: searchInfo.title, videoTitleImg: searchInfo.videoTitleImg, 
          author: searchInfo.author, videoUrl: searchInfo.videoUrl})
        .then((res, resp) => {
          if (res.code == '0000000') {
            ElMessage({
              message: '发布成功',
              type: "success",
            });
            setTimeout(() => {
              router.push({path: '/videoManage'});
            }, 1000);
          }
        }).catch((err) => {
          console.log(err);
        })
      } else {
        ElMessage({
          message: "提交失败!",
          type: "error",
        });
        return false;
      }
    });
  };

  //上传前回调
  const beforeUploadVideo = (file) =>  {
      var fileSize = file.size / 1024 / 1024 < 50;   //控制大小  修改50的值即可
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1     //控制格式
      ) {
        ElMessage({
          message: "请上传正确的视频格式!",
          type: "error",
        });
        return false;
      }
      if (!fileSize) {
        ElMessage({
          message: "视频大小不能超过50MB!",
          type: "error",
        });
        return false;
      }
      isShowUploadVideo.value = false;
    }
    //进度条
    const uploadVideoProcess = (event, file, fileList) => {    //注意在data中添加对应的变量名
      videoFlag.value = true;  
      videoUploadPercent.value = file.percentage.toFixed(0) * 1;
    }
    //上传成功回调
    const handleVideoSuccess = (res, file) => {
      isShowUploadVideo.value = true;
      videoFlag.value = false;
      videoUploadPercent.value = 0;
    }
    // 上传视频
    const videoUpload = async(item) => {
      let formData = new FormData();
      formData.append("image", item.file);
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:3000/api/video/upload/video",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (res.data.code === "0000000") {
        searchInfo.videoUrl = res.data.filename;
      } else {
        ElMessage.error("上传失败");
      }
  };
</script>

<style scoped lang="scss">
  .docPreview {
    position: relative;
    background-color: #ffffff;
    padding: 20px 40px 0px;
    width: inherit;
    height: 722px;
    margin-left: 20px;
    overflow: auto;
  }
</style>

<style lang="scss" scoped>
  /* 上传按钮隐藏 */
  .disUploadBtn .el-upload--picture-card {
    display: none;
  }
  // 预览图片弹窗css
  .el-dialog .el-dialog__body {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
  }
  .el-dialog .el-dialog__header {
    border: 0px;
  }
  // 恢复预览部分的ul,ol展示效果
  .docPreviewHtml {
    ol {
      list-style-type: decimal;
      padding-inline-start: 40px;
      li {
        list-style-type: decimal;
      }
    }
    ul {
      list-style-type: disc;
      padding-inline-start: 40px;
      li {
        list-style-type: disc;
      }
    }
  }
  // 恢复editor部分的ul,ol展示效果
  .w-e-scroll {
    ol {
      list-style-type: decimal;
      padding-inline-start: 40px;
      li {
        list-style-type: decimal;
      }
    }
    ul {
      list-style-type: disc;
      padding-inline-start: 40px;
      li {
        list-style-type: disc;
      }
    }
  }

  .videoTitleImg {
    :deep(.el-upload) {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #58595a;
      }
      .fa-plus {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
      }
      .videoTitleImg {
        width: 120px;
        height: 120px;
        display: block;
      }
    }
  }

  .avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
</style>