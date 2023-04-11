<template>
  <div class="cont" v-if="showDiv">
    <div class="cont_1">
      <!-- 依法治校 -->
      <CommonNews :newsData="schoolLaw" />
      <!-- 安全校园 -->
      <CommonNews :newsData="safeCampus" />
      <!-- 政策解读 -->
      <CommonNews :newsData="policyAnalyzing" />
    </div>
    <div class="cont_2">
      <!-- 法律故事 -->
      <CommonNews :newsData="legalStory" />
      <!-- 国家时事 -->
      <CommonNews :newsData="nationalAffairs" />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { getArticle } from "../api/article"
import CommonNews from "@/components/CommonNews.vue";
import axios from 'axios';
export default {
  name: "News",
  components:{
    CommonNews,
  },
  setup() {
    const showDiv = ref(false);
    // 依法治校
    const schoolLaw = reactive({
      newsid: 5,
      newsName: '依法治校',
      showImg: true,
      newsContent: []
    });
    // 安全校园
    const safeCampus = reactive({
      newsid: 6,
      newsName: '安全校园',
      showImg: true,
      newsContent: []
    });
    // 政策解读
    const policyAnalyzing = reactive({
      newsid: 7,
      newsName: '政策解读',
      showImg: true,
      newsContent: []
    });
    // 法律故事
    const legalStory = reactive({
      newsid: 8,
      newsName: '法律故事',
      showImg: true,
      newsContent: []
    });
    // 国家时事
    const nationalAffairs = reactive({
      newsid: 9,
      newsName: '国家时事',
      showImg: true,
      newsContent: []
    });

    // 并发请求
    axios.all([getArticle({newsId: 5, page: 1, pageSize: 5}), 
    getArticle({newsId: 6, page: 1, pageSize: 5}),
    getArticle({newsId: 7, page: 1, pageSize: 5}),
    getArticle({newsId: 8, page: 1, pageSize: 5}),
    getArticle({newsId: 9, page: 1, pageSize: 5})]).then(axios.spread((article5, article6, article7, article8, article9) => {
      schoolLaw.newsContent = article5.data.list;
      safeCampus.newsContent = article6.data.list;
      policyAnalyzing.newsContent = article7.data.list;
      legalStory.newsContent = article8.data.list;
      nationalAffairs.newsContent = article9.data.list;
      showDiv.value = true;
    })).catch(err=>{
        console.log(err)
    })

    return {
      showDiv,
      schoolLaw,
      safeCampus,
      policyAnalyzing,
      legalStory,
      nationalAffairs,
    };
  },
};
</script>

<style lang="scss" scoped>
.cont {
  padding: 20px;
  .cont_1, .cont_2 {
    width: 100%;
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
}
</style>