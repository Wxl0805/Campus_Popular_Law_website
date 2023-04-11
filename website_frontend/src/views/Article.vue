<template>
  <div class="cont">
    <div class="paper-texture">
      <div class="title-header">
        <span class="title">{{ info.title }}</span>
        <div class="title-block">
          <span>作者：{{ info.author }}</span>
          <span>发布时间：{{ info.time }}</span>
        </div>
      </div>
      <div class="article-cont">
        <text v-html="info.content"></text>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { getArticleById } from '@/api/article';
import { useRoute } from 'vue-router';
export default {
  name: 'Article',
  setup() {
    const route = useRoute();

    const info = reactive({
      title: '',
      content: '',
      author: '',
      time: ''
    })
    const id = ref(null);

    const getArticle = async() => {
      const data = await getArticleById(id.value);
      if(data.code == '0'){
        info.title = data.data.title;
        info.content = data.data.content;
        info.author = data.data.author;
        info.time = data.data.time;
      }
    }

    onMounted(() => {
      id.value = route.query.id;
      getArticle();
    })

    return {
      info,
    }
  },
}
</script>

<style lang="scss" scoped>
.cont{
  width: 100%;
  padding: 20px 0;
  // background: rgba($color: #dcdbdb, $alpha: 0.5);
  display: flex;
  justify-content: center;
  font-size: 16px;
  .paper-texture {
    position: relative;
    overflow: hidden;
    width: 800px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title-header{
      width: 100%;
      min-height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #b4b4b8;
      .title{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
      }
      .title-block{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        font-size: 15px;
        color: #737376;
        margin-bottom: 20px;
      }
    }
    .article-cont {
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      font-size: 15px;
    }
  }

  .paper-texture::before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: #f8f8f8;
  }

}
</style>