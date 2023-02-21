<template>
  <div class="box">
    <div class="product">
      <div class="flash">
        <div>
          <el-carousel height="3.47rem" arrow="never">
            <el-carousel-item v-for="(item, index) in flash" :key="index">
              <img :src="item.url" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="second">
          <h3>
            费尔智能杀毒 8
            <sup>全新换代</sup>
          </h3>
          <p v-for="(item, index) in desc" :key="index">
            <i class="el-icon-check"></i>
            {{ item }}
          </p>
          <a href="http://fdrfilup.filseclab.com/down/twister8_setup.exe">
            <el-button type="success">下载试用</el-button>
          </a>
        </div>
      </div>
      <div class="what">
        <h4>什么是 费尔智能杀毒？</h4>
        <el-divider></el-divider>
        <p class="mb">费尔智能杀毒8是费尔历时长达5年精心打造的以智能为核心的新一代反病毒产品（原名：费尔托斯特安全），30余项技术突破与革新，集主动防御、虚拟机、启发、基因、黑盒、回滚、云安全等几乎所有当前一流安全技术于一身，拥有强大的防御能力。令人惊奇的精准回滚，震撼的多媒体动画交互界面和语音控制将带给您与众不同的使用体验。</p>
        <h4>功能亮点</h4>
        <el-divider></el-divider>
        <Function :fnData='fnData' />
        <h4>曾或荣誉</h4>
        <el-divider></el-divider>
        <div class="mb">
          <el-image v-for="(item,index) in showImgData.obj" :src="item.url" fit="none" :key="index"></el-image>
          <div class="more">
            <span @click="moreImgData">{{btnText}}</span>
          </div>
        </div>
        <h4>媒体评价</h4>
        <el-divider></el-divider>
        <div class="vb" v-pre>
          <p>Filseclab is the perennial battler, detection rates were pretty decent, with good levels in the response sets and a good start to the RAPs too, earning the product a 'solid' rating.</p>
          <p>(整体评价) 费尔是一个常年参与测试的斗士，它对恶意样本集一直拥有相当高的检出率，并且在RAPs(新威胁)测试中也有非常好的表现，所以它赢得了“稳固”的评级。</p>
          <p>Well, it's still doing great considering it's only heuristics and no signatures. It seems to be detecting over 60% of our samples - better than some signature scanners!</p>
          <p>(纯启发评价) 在没有病毒库仅靠启发的情况下它的表现依然很棒，在我们的恶意样本集中它的检出率超过了60%(几乎没有误报)，这甚至要好过某些特征码引擎。</p>
          <div class="speaker">
            - 英国VB100评测
            <img src="http://filseclab.com/images/award_vb.png" alt="">
          </div>
        </div>
        <div class="vb" v-pre>
          <p>Your program software are well known and it's for that reason we would like to have a full version for our readers. Twister Antivirus will be interesting program, we will include you program in the CD-ROM magazine, with a space on the covermount CD and on the cover also.</p>
          <p>你们的软件很有名望，正是这个原因我们希望获得一个完整的版本，以提供给我们的读者使用。费尔杀毒软件让人很感兴趣，我们将在杂志的光盘和封面上刊登你们的程序。</p>
          <div class="speaker">
            - HAKIN9.ORG
            <img src="http://filseclab.com/images/media_hakin9c.jpg" alt="">
            <img src="http://filseclab.com/images/award_hakin9.png" alt="">
          </div>
        </div>
        <h4>用户评价</h4>
        <el-divider></el-divider>
        <div class="vb" v-pre>
          <p>I can not stop talking to my friends how pleased I am with Twister. Before I decided to try your product, I tried Norton, Avast, McAfee, Kaspersky, and I do not remember a couple others more which. I tried them on a badly infected computer. At the last I gave Twister a try and found another 12 Trojans/virus left over after all the other programs finished scanning and repairing the computer. That was enough for me to buy 3 twisters.</p>
          <p>我无法停止向我的朋友炫耀我拥有费尔杀毒。在我决定尝试你们的产品之前，我尝试了诺顿、Avast、McAfee、卡巴斯基，和更多我已经记不清的杀毒软件。我在一个被严重感染的电脑中尝试它们，随后我尝试了费尔，它又发现了其他所有杀毒软件都没有发现的12个木马/病毒并且修复了我的电脑，这就足够让我买了3套费尔。</p>
          <div class="speaker">
            - John Papazoglou
          </div>
        </div>
        <h4>分享</h4>
        <el-divider></el-divider>
        <div class="share">
          <Share></Share>
          <span class="desc">* 1年/1电脑授权：是指您有权在1台电脑上安装使用本产品，并且从第一次激活开始起1年内有效。有效期内您可以持续获得产品的数据更新和功能更新，在整个服务期间内您需要接受费尔产品的使用许可协议。产品的功能在服务期间可能会被添加，修改，或删除。</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Function from '@/components/Function.vue'
import Share from '@/components/Share.vue'
import { reactive, ref } from '@vue/reactivity';
export default {
  name: "Product",
  components:{
    Function,
    Share
  },
  setup() {
    const flash = [
      {
        url: "http://filseclab.com/images/thumb_twister_snapshot_00.jpg",
      },
      {
        url: "http://filseclab.com/images/thumb_twister_snapshot_01.jpg",
      },
      {
        url: "http://filseclab.com/images/thumb_twister_snapshot_02.jpg",
      },
      {
        url: "http://filseclab.com/images/thumb_twister_snapshot_06.jpg",
      },
      {
        url: "http://filseclab.com/images/thumb_twister_snapshot_07.jpg",
      },
      {
        url: "http://filseclab.com/images/thumb_twister_snapshot_08.jpg",
      },
    ];
    const desc = [
      "12年资深专业安全，30余项技术革新",
      "整合几乎所有一流防御能力于一身",
      "记忆式智能主动防御系统",
      "MVM威胁虚拟机，智能高级启发",
      "智能黑盒，威胁超级回滚",
      "云端联合防御，数字神经网络",
      "威胁诱捕陷阱，隐私数据保护",
      "系统加固，缓冲区溢出保护，蓝屏灾难保护",
      "断点续扫，智能提速，资源载荷均衡",
      "语音控制与人声模拟",
      "多媒体全景交互动画界面",
      "支持32/64位最新Windows和服务器系统",
    ];
    const fnData = [{
      img: 'http://filseclab.com/images/ico_shield.png',
      title: ['全新V8引擎'],
      desc: '高效查杀病毒、木马及各种威胁程序，提供强劲安全动力'
    },{
      img: 'http://filseclab.com/images/ico_dds.png',
      title: ['第二代动态防御'],
      desc: '检查您电脑中每一个程序的行为并智能判断其是否有害'
    },{
      img: 'http://filseclab.com/images/ico_cloud.png',
      title: ['EVANET云安全'],
      desc: '基于数字神经网络模型构建联合防御体系，自我感知并抵御潜伏性威胁'
    },{
      img: 'http://filseclab.com/images/ico_blackbox.png',
      title: ['智能黑盒 + 超级回滚'],
      desc: '深度追踪程序的每一个行为细节，接近完美的回滚修复能力，可让电脑迅速恢复至安全状态'
    },{
      img: 'http://filseclab.com/images/ico_isolate.png',
      title: ['Malware Virtual Machine™'],
      desc: 'MVM能够模拟出一个真实的操作环境，以使恶意程序表现出它们的真实行为'
    },{
      img: 'http://filseclab.com/images/ico_scan.png',
      title: ['智能高级启发 + 智能基因'],
      desc: '先进的动态/静态启发技术和智能基因技术，无须更新和联网也可识别最新威胁'
    },{
      img: 'http://filseclab.com/images/ico_smart.png',
      title: ['智能提速'],
      desc: '自动记忆已经扫描的文件，极大提升监控和再次扫描的速度'
    },{
      img: 'http://filseclab.com/images/ico_lock.png',
      title: ['隐私保护'],
      desc: '保护您的重要文档信息免被窥视和窃取'
    },{
      img: 'http://filseclab.com/images/ico_user.png',
      title: ['多用户，多任务'],
      desc: '支持多用户同时登录使用、多个扫描并行工作'
    },{
      img: 'http://filseclab.com/images/ico_irb.png',
      title: ['资源载荷均衡'],
      desc: '智能调整自身的内存CPU耗用，低配电脑也能畅行无阻'
    },{
      img: 'http://filseclab.com/images/ico_update.png',
      title: ['自动更新'],
      desc: '7x24x365不间断数据库更新和模块更新，自动获取最新改进，保障抵御最新威胁'
    },{
      img: 'http://filseclab.com/images/ico_speech.png',
      title: ['语音控制与人声模拟'],
      desc: '不仅能听懂您说出的命令，还能模拟人声自然对话，感受智能科技带来的非凡体验'
    },{
      img: 'http://filseclab.com/images/ico_trap.png',
      title: ['威胁诱捕陷阱'],
      desc: '对于反复再生的威胁，设置圈套陷阱将有效捕捉母体源头'
    },{
      img: 'http://filseclab.com/images/ico_bsod.png',
      title: ['蓝屏保护 + 缓冲区溢出保护'],
      desc: '首创蓝屏保护，阻止修复蓝屏灾难。保护电脑中每个程序免受缓冲区0day攻击'
    },{
      img: 'http://filseclab.com/images/ico_skin.png',
      title: ['全景动画界面 + 多皮肤'],
      desc: '震撼的多媒体全景交互动画，不同风格的皮肤任由选择'
    }]
    const imgData = [{
      url: 'http://filseclab.com/images/award_china1.png'
    },{
      url: 'http://filseclab.com/images/award_opswat.png'
    },{
      url: 'http://filseclab.com/images/award_vb.png'
    },{
      url: 'http://filseclab.com/images/award_pcsl.png'
    },{
      url: 'http://filseclab.com/images/award_wildlist.png'
    },{
      url: 'http://filseclab.com/images/award_hakin9.png'
    },{
      url: 'http://filseclab.com/images/award_typhoon.gif'
    },{
      url: 'http://filseclab.com/images/award_china2.png'
    },{
      url: 'http://filseclab.com/images/award_pcsl_jul10.png'
    },{
      url: 'http://filseclab.com/images/award_softpedia.gif'
    },{
      url: 'http://filseclab.com/images/award_freedown.png'
    },{
      url: 'http://filseclab.com/images/award_findmysoft.png'
    },{
      url: 'http://filseclab.com/images/award_wareseeker.gif'
    },{
      url: 'http://filseclab.com/images/award_filtrans.gif'
    },{
      url: 'http://filseclab.com/images/award_bsoft.gif'
    },{
      url: 'http://filseclab.com/images/award_top4down.gif'
    },{
      url: 'http://filseclab.com/images/award_hotlib.gif'
    },{
      url: 'http://filseclab.com/images/award_sehr-gut.png'
    },{
      url: 'http://filseclab.com/images/award_pcsl_may09.gif'
    }]
    let showImgData = reactive({
      obj:imgData.slice(0,7)
    })
    const moreImgData = () =>{
      showImgData.obj=showImgData.obj.length!==imgData.length?imgData:imgData.slice(0,7)
      btnText.value=btnText.value==='更多荣誉...'?'收起⬆':'更多荣誉...'
    }
    const btnText = ref('更多荣誉...')
    return {
      flash,
      desc,
      fnData,
      showImgData,
      moreImgData,
      btnText
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 0.4rem 0;
  background: url(http://filseclab.com/images/product_bk.jpg) no-repeat center
    top;
}
.product {
  width: 12rem;
  margin: auto;
  font-size: 0;
}
.flash {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .4rem;
  & > div {
    width: 49%;
    img {
      width: 100%;
    }
  }
  .second {
    box-sizing: border-box;
    padding-left: 0.2rem;
  }
  h3 {
    font-size: 0.26rem;
    color: #363636;
    font-weight: normal;
    margin-bottom: 0.1rem;
    sup {
      font-size: 70%;
      color: #ff9900;
    }
  }
  p {
    line-height: 0.3rem;
    font-size: 0.18rem;
    .el-icon-check {
      color: #8ab402;
      font-weight: bolder;
    }
    &:nth-last-of-type(1) {
      margin-bottom: 0.15rem;
    }
  }
}
.what{
  h4{
    font-size: .22rem;
    color: #363636;
    font-weight: normal;
  }
  p{
    font-size: .16rem;
  }
  .el-image{
    margin-left: .15rem;
  }
  .more{
    font-size: .16rem;
    color: #e87f00;
    text-align: right;
    span{
      cursor: pointer;
    }
  }
  .vb{
    padding-left: .35rem;
    background: url(http://filseclab.com/images/quote_l.gif) no-repeat left top/.24rem;
    p{
      font-size: .12rem;
      color: #464646;
      line-height: .2rem;
      &:nth-of-type(2){
        margin-bottom: .1rem;
      }
    }
    .speaker{
      // height: .48rem;
      // line-height: .48rem;
      font-size: .12rem;
      color: #7d7d7d;
      text-align: right;
      margin-bottom: .2rem;
      img{
        // height: 100%;
        vertical-align: middle;
      }
    }
  }
  .share{
    .desc{
      font-size: .12rem;
      color: #7d7d7d;
    }
  }
}
.mb{
  margin-bottom: .6rem;
}
</style>