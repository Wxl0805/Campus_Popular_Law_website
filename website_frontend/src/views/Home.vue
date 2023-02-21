<template>
  <div v-if="state==='pc'">
    <!-- 轮播图 -->
    <el-carousel height="4.4rem">
      <el-carousel-item
        v-for="(item, index) in arr"
        :key="index"
        :class="'index' + index"
      >
        <div class="container">
          <div class="left">
            <img :src="item.img" />
          </div>
          <div class="right">
            <div>
              <h2 v-show="item.text.title">{{ item.text.title }}</h2>
              <h3 v-for="(iten, inde) in item.text.context" :key="inde + 'a'">
                {{ iten }}
              </h3>
            </div>
            <img
              v-show="item.littleImg"
              :src="item.littleImg"
              alt=""
              class="littleImg"
            />
            <a :href="item.download">
              <el-button type="success" icon="el-icon-download"
                >立即下载</el-button
              >
            </a>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 产品功能 -->
    <Function :fnData="fnData" more />
    <!-- 新闻动态 -->
    <News :newsList="newsList" :updateLog="updateLog" />
  </div>
  <div v-else class="mobile">
    <h2>费尔智能杀毒 8</h2>
    <h3>全面安全</h3>
    <a href="http://fdrfilup.filseclab.com/down/twister8_setup.exe">立即下载</a>
    <p class="compatible">全面兼容win10、win7及xp等操作系统</p>
    <h2>费尔托斯特安全 V7</h2>
    <h3>安全到家</h3>
    <a href="http://fdrfilup.filseclab.com/down/twister8_setup.exe">立即下载</a>
    <p class="compatible">全面兼容win10、win7及xp等操作系统</p>
    <p class="footer">建议使用电脑端查看本页面</p>
  </div>
</template>

<script>
import Function from "@/components/Function.vue";
import News from "@/components/News.vue";
import { useStore } from "vuex";
import { computed} from "vue";
export default {
  name: "Home",
  components: {
    Function,
    News,
  },
  setup() {
    const arr = [
      {
        img: "http://filseclab.com/images/page1_img.png",
        text: {
          title: "费尔智能杀毒 8",
          context: [
            "智能主防，云安全，虚拟机，启发，护航XP",
            "几乎拥有所有防御能力于一身",
            "权威机构测试，获得众多荣誉",
            "更智能，更敏捷，更安全",
          ],
        },
        littleImg: "http://filseclab.com/images/award_all_zh-cn.png",
        download: "http://dl.filseclab.com/down/twister8_setup.exe",
      },
      {
        img: "http://filseclab.com/images/page2_img.png",
        text: {
          context: [
            "多媒体全景交互动画界面",
            "能听会说的智能语音控制与人声模拟",
            "不同皮肤任意切换，喜好自由掌控",
            "体验令人震撼的使用感受",
            "领略与众不同的安全保护",
          ],
          download: "http://dl.filseclab.com/down/twister8_setup.exe",
        },
      },
      {
        img: "http://filseclab.com/images/page3_img.png",
        text: {
          context: [
            "云安全开拓者，全新的EVANET",
            "智能主动防御系统 MCBAS",
            "超级回滚技术 Super Rollback",
            "虚拟机技术 MVM",
            "高级启发技术",
            "人工智能支持系统",
          ],
          download: "http://dl.filseclab.com/down/twister8_setup.exe",
        },
      },
    ];
    const fnData = [
      {
        img: "http://filseclab.com/images/ico_shield.png",
        title: ["杀病毒/木马", "抵御各类威胁"],
        desc: undefined,
      },
      {
        img: "http://filseclab.com/images/ico_cloud.png",
        title: ["智能主动防御", "EVANET云安全"],
        desc: undefined,
      },
      {
        img: "http://filseclab.com/images/ico_blackbox.png",
        title: ["智能黑盒", "超级回滚"],
        desc: undefined,
      },
      {
        img: "http://filseclab.com/images/ico_isolate.png",
        title: ["威胁虚拟机", "智能高级启发"],
        desc: undefined,
      },
      {
        img: "http://filseclab.com/images/ico_lock.png",
        title: ["威胁诱捕陷阱", "隐私数据保护"],
        desc: undefined,
      },
      {
        img: "http://filseclab.com/images/ico_bsod.png",
        title: ["系统加固", "蓝屏灾难保护"],
        desc: undefined,
      },
      {
        img: "http://filseclab.com/images/ico_smart.png",
        title: ["智能提速", "资源载荷均衡"],
        desc: undefined,
      },
      {
        img: "http://filseclab.com/images/ico_speech.png",
        title: ["语音控制与合成", "能听会说智能交互"],
        desc: undefined,
      },
    ];
    const newsList = [
      {
        title: "费尔为XP用户保驾护航 ",
        url: "http://filseclab.com/zh-cn/news/14040115.htm",
      },
      {
        title: "费尔智能杀毒 8.17 发布",
        url: "http://filseclab.com/zh-cn/news/13071016.htm",
      },
      {
        title: "费尔受邀出席AVAR2012国际盛会",
        url: "http://filseclab.com/zh-cn/news/12112818.htm",
      },
      {
        title: "宣传片：V8来了",
        url: "http://filseclab.com/zh-cn/news/12092908.htm",
      },
      {
        title: "费尔智能杀毒V8震撼公测",
        url: "http://filseclab.com/zh-cn/news/12080808.htm",
      },
      {
        title: "世界权威机构VB100公布全球杀软评测报告: 费尔杀毒侦测率99.98%",
        url: "http://filseclab.com/zh-cn/news/12011113.htm",
      },
    ];
    const updateLog = [
      {
        title:
          "2021/07/02 07:14 (1). 病毒库升级到2021.07.02.07:14，新增539个威胁特征。本日第1次更新，日累计新增539。总数：10147187",
      },
    ];
    const state = computed(() => useStore().state.client);
    return {
      arr,
      fnData,
      newsList,
      updateLog,
      state
    };
  },
};
</script>

<style lang="scss" scoped>
.index0 {
  background-image: linear-gradient(#172e57, #01579a, #11b8ff);
}
.index1 {
  background-image: linear-gradient(#010714, #3f3f3f, #2d61da);
}
.index2 {
  background-image: linear-gradient(
    to left bottom,
    #772800,
    #efa248,
    #ffdba6,
    #efa248
  );
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
}
.mobile{
  text-align: center;
  box-sizing: border-box;
  padding-top: 1rem;
  h2{
    font-size: .66rem;
    color: #3f3f3f;
  }
  h3{
    font-size: .66rem;
    color: #3f3f3f;
    margin-bottom: .72rem;
  }
  a{
    display: block;
    width: 3.6rem;
    line-height: 1rem;
    background-color: #12cd5a;
    font-size: .32rem;
    color: #fff;
    margin: auto;
    margin-bottom: .4rem;
  }
  .compatible{
    color: #474747;
    font-size: .14rem;
    margin-bottom: .8rem;
  }
  .footer{
    color: #0bd561;
    font-size: .4rem;
  }
}
</style>
