<template>
  <div v-if="state==='pc'">
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
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Home",
  components: {
    CommonNews,
  },
  setup () {
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
    // 网站公告
    const announceData = {
      newsid: 1,
      newsName: '网站公告',
      showImg: false,
      newsContent: [
        {
          id: 1,
          title: '教育部全国青少年普法网政府网站工作年度报表（2022 年度）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部全国青少年普法网政府网站工作年度报表（2022 年度）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部全国青少年普法网政府网站工作年度报表（2022 年度）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部全国青少年普法网政府网站工作年度报表（2022 年度）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部全国青少年普法网政府网站工作年度报表（2022 年度）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部全国青少年普法网政府网站工作年度报表（2022 年度）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        }
      ]
    };
    // 热点资讯
    const HotInfo = {
      newsid: 2,
      newsName: '热点资讯',
      showImg: true,
      newsContent: [
        {
          id: 1,
          title: '教育部开展2023年春季开学工作调研',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部开展2023年春季开学工作调研',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部开展2023年春季开学工作调研',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部开展2023年春季开学工作调研',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部开展2023年春季开学工作调研',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '教育部开展2023年春季开学工作调研',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
      ]
    };
    // 法律常识
    const LegalCommonSense = {
      newsid: 3,
      newsName: '法律常识',
      showImg: true,
      newsContent: [
        {
          id: 1,
          title: '宪法基础知识（六十七）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '宪法基础知识（六十七）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '宪法基础知识（六十七）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '宪法基础知识（六十七）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '宪法基础知识（六十七）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '宪法基础知识（六十七）',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
      ]
    };
    // 法律法规
    const LawsAndRegulations = {
      newsid: 4,
      newsName: '法律法规',
      showImg: true,
      newsContent: [
        {
          id: 1,
          title: '信息技术产品国家通用语言文字使用管理规定',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '信息技术产品国家通用语言文字使用管理规定',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '信息技术产品国家通用语言文字使用管理规定',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '信息技术产品国家通用语言文字使用管理规定',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '信息技术产品国家通用语言文字使用管理规定',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        },
        {
          id: 1,
          title: '信息技术产品国家通用语言文字使用管理规定',
          time: '2022-01-01',
          author: 'www',
          content: '3u12yeuiqhkdhjahqkjwhqwdjakdhjafgjaskgkjadsfsdaajfkgsa',
          titleImg: '',
        }
      ]
    };
    const state = computed(() => useStore().state.client);
    return {
      arr,
      state,
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
