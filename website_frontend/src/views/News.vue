<template>
  <div class="cont">
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
// import { reactive, ref } from '@vue/reactivity';
import CommonNews from "@/components/CommonNews.vue";
export default {
  name: "News",
  components:{
    CommonNews,
  },
  setup() {
    // 依法治校
    const schoolLaw = {
      newsid: 1,
      newsName: '依法治校',
      showImg: true,
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
    // 安全校园
    const safeCampus = {
      newsid: 1,
      newsName: '安全校园',
      showImg: true,
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
    // 政策解读
    const policyAnalyzing = {
      newsid: 1,
      newsName: '政策解读',
      showImg: true,
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
    // 法律故事
    const legalStory = {
      newsid: 1,
      newsName: '法律故事',
      showImg: true,
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
    // 国家时事
    const nationalAffairs = {
      newsid: 1,
      newsName: '国家时事',
      showImg: true,
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
    return {
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