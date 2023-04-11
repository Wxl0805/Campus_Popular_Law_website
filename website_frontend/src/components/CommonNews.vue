<template>
  <div class="main">
    <div class="title">
      <span>{{ newsData.newsName }}</span>
      <div style="cursor:pointer;">更多</div>
    </div>
    <div class="img-title" v-if="newsData.showImg" @click="toArticle(newsData.newsContent[0].id)">
      <div class="img">
        <img v-if="!newsData.newsContent[0].titleImg || newsData.newsContent == null" src="../assets/no_picture.gif" :alt="newsData.newsContent[0].title" :title="newsData.newsContent[0].title">
        <img v-else :src="newsData.newsContent[0].titleImg" :alt="newsData.newsContent[0].title" :title="newsData.newsContent[0].title">
      </div>
      <div class="cont"><span>{{ newsData.newsContent[0].title }}</span></div>
    </div>
    <div class="content">
      <div v-for="(item, index) in newsData.newsContent" :key="index" class="text" @click="toArticle(item.id)">
        <span>·&nbsp;{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    newsData: {
      type: Object,
      default : () => {}
    }
  },
  setup(){
    const router = useRouter();
    const toArticle = (id) => {
      router.push({path: '/article', query: {id: id}});
    }

    return {
      toArticle,
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
    span{
      font-size: 20px;
      font-weight: bold;
    }
    div{
      font-size: 14px;
      color: red;
    }
  }
  .img-title {
    width: 100%;
    display: flex;
    margin-top: 20px;
    gap: 20px;
    .img {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .cont {
      // width: 100%;
      width: 250px;
      display: flex;
      justify-content: center;
      // align-items: center;
      span{
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }
  .content {
    width: 100%;
    .text {
      width: 100%;
      margin: 20px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      span{
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>