<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="gva-search-box" style="position: relative;">
          <el-form ref="searchForm" :model="searchInfo" :rules="rules">
            <el-form-item label="标题" prop="title">
              <el-input v-model="searchInfo.title" placeholder="请输入文章标题" @change="onTitleInputChange"> </el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="searchInfo.author" placeholder="请输入文章作者" @change="onAuthorInputChange"> </el-input>
            </el-form-item>
            <el-form-item label="文章类型" prop="articleType">
              <el-select v-model="searchInfo.articleType" clearable placeholder="请选择文章类型">
                <el-option v-for="item in statusOptions" :key="item.id" :label="`${item.label}`" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="选择封面图" prop="titleImg">
              <el-upload
                class="titleImg"
                action="#"
                :show-file-list="false"
                :http-request="testUpload"
                :before-upload="beforeUpload"
              >
                <img
                  v-if="searchInfo.titleImg"
                  :src="searchInfo.titleImg"
                  class="titleImg"
                >
                <i
                  v-else
                  class="fa-plus"
                ></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(searchForm)">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row justify="space-around">
      <el-col :span="18">
        <div class="head">
          <div style="border: 1px solid #ccc;">
            <Toolbar style="border-bottom: 1px solid #ccc;" :editor="editorRef" :defaultConfig="toolbarConfig" />
            <Editor style="height: 700px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" @onCreated="handleCreated" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="docPreview">
          <view v-html="valueHtml" style="margin-top: 20px;" class="docPreviewHtml"></view>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="head">
          <textarea v-model="valueHtml" readonly style="width: 100%; height: 300px;"></textarea>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup> 
  import "@wangeditor/editor/dist/css/style.css"; // 引入 css
  import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
  import { onBeforeUnmount, ref, reactive, shallowRef } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { getArticleOneApi, modifyArticleApi, articletitleImgUploadApi } from "@/api/modules/article";
  import { ElMessage } from "element-plus";
  import axios from "axios";
import { onMounted } from 'vue';
  // const user = useUserStore();
  const route = useRoute(); //路由参数
  const router = useRouter(); //跳转路由
  // 表单验证规则
  const rules = reactive({
    title: [
      {
        required: true,
        message: "请输入文章标题",
        trigger: "change",
      },
    ],
    author: [
      {
        required: true,
        message: "请输入文章作者",
        trigger: "change",
      },
    ],
    articleType: [
      {
        required: true,
        message: "请选择文章类型",
        trigger: "change",
      },
    ],
  });
  // formRef
  const searchForm = ref();
  // editor编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();
  // editor内容 HTML
  const valueHtml = ref("");
  // editor组件相关
  const toolbarConfig = {};
  toolbarConfig.excludeKeys = [
    // "group-more-style", // 排除菜单组，写菜单组 key 的值即可
    "todo",
    "blockquote",
    "|",
    "fullScreen",
    "codeBlock",
    "insertTable",
    // "uploadImage",
    "uploadVideo",
  ];
  const editorConfig = { placeholder: "请输入内容...", MENU_CONF: {} };
  // editor工具栏菜单-字号
  editorConfig.MENU_CONF["fontSize"] = {
    fontSizeList: ["12px", "14px", "16px", "22px", "28px", "36px", "42px"],
  };
  // editor工具栏菜单-文字颜色
  editorConfig.MENU_CONF["color"] = {
    colors: ["#2E334E", "#9EA3BB"],
  };
  // editor工具栏菜单-字体
  editorConfig.MENU_CONF["fontFamily"] = {
    fontFamilyList: [
      "黑体",
      "楷体",
      { name: "仿宋", value: "仿宋" },
      { name: "苹方-简", value: "PingFang SC" },
      { name: "苹方-简 中黑体", value: "PingFangSC-Medium" },
      "Arial",
      "Tahoma",
      "Verdana",
    ],
  };
  // editor工具栏菜单-图片上传
  editorConfig.MENU_CONF["uploadImage"] = {
    // 小于该值就插入 base64 格式（而不上传），默认为 0
    base64LimitSize: 5 * 1024 * 1024 * 1024, // 5Gb
  };
  // editor组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });
  const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
  const searchInfo = reactive({
    id: '',
    title: '',
    author: '',
    content: '',
    articleType: 1,
    titleImg: '',
  });
  const statusOptions = ref([
    {
      value: 1,
      label: "网站公告",
    },
    {
      value: 2,
      label: "热点资讯",
    },
    {
      value: 3,
      label: "法律常识",
    },
    {
      value: 4,
      label: "法律法规",
    },
    {
      value: 5,
      label: "依法治校",
    },
    {
      value: 6,
      label: "安全校园",
    },
    {
      value: 7,
      label: "政策解读",
    },
    {
      value: 8,
      label: "法律故事",
    },
    {
      value: 9,
      label: "国家时事",
    },
  ]);

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
        url: "127.0.0.1:3000/api/article/upload/titleImg",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (res.data.code === "0000000") {
        console.log(res);
        searchInfo.titleImg = res.data.filename;
      } else {
        ElMessage.error("上传失败");
      }
  };
  // 顶部输入信息相关
  const onTitleInputChange = () => {};
  const onAuthorInputChange = () => {};
  // 提交图片
  const onSubmit = (formEl) => {
    console.log("提交文章");
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        modifyArticleApi({id: searchInfo.id,title: searchInfo.title, content: valueHtml.value, titleImg: searchInfo.titleImg,
        newsId: searchInfo.articleType, author: searchInfo.author})
        .then((res, resp) => {
          if (res.code == '0000000') {
            ElMessage({
              message: '修改成功',
              type: "success",
            });
            setTimeout(() => {
              router.push({path: '/contentManage'});
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

  // 获取文章信息
  const getarticleInfo = async() => {
    const data = await getArticleOneApi({id: searchInfo.id});
    if(data.code == '0000000'){
      searchInfo.title = data.data.title;
      searchInfo.articleType = data.data.newsId;
      searchInfo.author = data.data.author;
      searchInfo.titleImg = data.data.titleImg;
      valueHtml.value = data.data.content;
    }
  }

  onMounted(() => {
    searchInfo.id = route.query.id;
    getarticleInfo();
  })
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

  .titleImg {
    margin-top: 8px;
    .el-upload {
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
      .titleImg {
        width: 120px;
        height: 120px;
        display: block;
      }
    }
  }
</style>