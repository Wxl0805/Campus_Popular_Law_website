<template>
  <div v-if="showDiv">
    <!-- 轮播图 -->
    <el-carousel height="4.4rem">
      <el-carousel-item
        v-for="(item, index) in arr"
        :key="index"
        :class="'index' + index"
      >
      </el-carousel-item>
    </el-carousel>
    <!-- 网站公告 -->
    <CommonNews :newsData="announceData" />
    <div class="block">
      <!-- 热点资讯 -->
      <CommonNews :newsData="HotInfo" />
      <!-- 法律常识 -->
      <CommonNews :newsData="LegalCommonSense" />
      <!-- 法律法规 -->
      <CommonNews :newsData="LawsAndRegulations" />
    </div>
  </div>
</template>

<script>
import CommonNews from "@/components/CommonNews.vue";
import { getArticle } from "../api/article"
// import { useRoute,useRouter } from 'vue-router';
import { reactive, ref } from "vue";
import axios from 'axios';
export default {
  name: "Home",
  components: {
    CommonNews,
  },
  setup () {
    // const route = useRoute()
    // const router = useRouter()
    const showDiv = ref(false);
    const arr = [
      {
        img: "",
        text: {
          context: [
          ],
        },
      },
      {
        img: "",
        text: {
          context: [
          ],
        },
      },
      {
        img: "",
        text: {
          context: [
          ],
        },
      },
    ];
    // // 获取网站公告
    // const getannounceData = async() => {
    //   const data = await getArticle({newsId: 1, page: 1, pageSize: 5});
    //   if(data.code == '0'){
    //     announceData.newsContent = data.data.list;
    //   }
    // }
    // // 获取热点资讯
    // const getHotInfo = async() => {
    //   const data = await getArticle({newsId: 2, page: 1, pageSize: 5});
    //   if(data.code == '0'){
    //     HotInfo.newsContent = data.data.list;
    //   }
    // }
    // // 获取法律常识
    // const getLegalCommonSense = async() => {
    //   const data = await getArticle({newsId: 3, page: 1, pageSize: 5});
    //   if(data.code == '0'){
    //     LegalCommonSense.newsContent = data.data.list;
    //   }
    // }
    // // 获取法律法规
    // const getLawsAndRegulations = async() => {
    //   const data = await getArticle({newsId: 4, page: 1, pageSize: 5});
    //   if(data.code == '0'){
    //     LawsAndRegulations.newsContent = data.data.list;
    //   }
    // }

    // 网站公告
    const announceData = reactive({
      newsId: 1,
      newsName: '网站公告',
      showImg: false,
      newsContent: []
    });
    // 热点资讯
    const HotInfo = reactive({
      newsId: 2,
      newsName: '热点资讯',
      showImg: true,
      newsContent: []
    });
    // 法律常识
    const LegalCommonSense = reactive({
      newsId: 3,
      newsName: '法律常识',
      showImg: true,
      newsContent: []
    });
    // 法律法规
    const LawsAndRegulations = reactive({
      newsId: 4,
      newsName: '法律法规',
      showImg: true,
      newsContent: []
    });

    // onMounted(async() => {
    //   await getannounceData();
    //   await getHotInfo();
    //   await getLawsAndRegulations();
    //   await getLegalCommonSense();
    //   showDiv.value = true;
    // })

    // 并发请求
    axios.all([getArticle({newsId: 1, page: 1, pageSize: 5}), 
    getArticle({newsId: 2, page: 1, pageSize: 5}),
    getArticle({newsId: 3, page: 1, pageSize: 5}),
    getArticle({newsId: 4, page: 1, pageSize: 5})]).then(axios.spread((article1, article2, article3, article4) => {
      announceData.newsContent = article1.data.list;
      HotInfo.newsContent = article2.data.list;
      LegalCommonSense.newsContent = article3.data.list;
      LawsAndRegulations.newsContent = article4.data.list;
      showDiv.value = true;
    })).catch(err=>{
        console.log(err)
    })

    return {
      showDiv,
      arr,
      announceData,
      HotInfo,
      LegalCommonSense,
      LawsAndRegulations,
    };
  },
};
</script>

<style lang="scss" scoped>
.index0 {
  background: url("../assets/pufa_banner1.jpg") no-repeat;
  background-size: 100% 100%;
}
.index1 {
  background: url("../assets/pufa_banner2.jpg") no-repeat;
  background-size: 100% 100%;
}
.index2 {
  background: url("../assets/pufa_banner3.jpeg") no-repeat;
  background-size: 100% 100%;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 12rem;
  height: 100%;
  margin: auto;
  font-size: 0;
  .left {
    img {
      height: 3.6rem;
    }
  }
  .right {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 80%;
    .littleImg {
      width: 2.51rem;
    }
  }
  h2,
  h3 {
    color: #d7d7d7;
  }
  h2 {
    font-size: 0.32rem;
    color: #f90;
  }
  h3 {
    font-size: 0.22rem;
  }
}
.el-carousel {
  margin-bottom: 0.8rem;
  overflow: hidden;
  border-radius: 5px;
}
.block {
  width: 100%;
  // height: 300px;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
  overflow: auto;
}
</style>
