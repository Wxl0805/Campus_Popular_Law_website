<template>
  <div class="box">
    <div class="container">
      <h3>帮助文档</h3>
      <el-divider></el-divider>
      <ul class="uldesc">
        <li><a href="http://filseclab.com/zh-cn/help/twister.htm">费尔智能杀毒</a></li>
        <li><a href="http://filseclab.com/zh-cn/help/firewall.htm">费尔个人防火墙</a></li>
        <li><a href="http://filseclab.com/zh-cn/help/guardian.htm">费尔网络监护专家</a></li>
        <li><a href="http://filseclab.com/zh-cn/help/common.htm">费尔公用模块(软件激活向导、在线升级向导)</a></li>
      </ul>
      <h3>找回授权码</h3>
      <el-divider></el-divider>
      <p>如果您的授权码/注册码/Key不小心弄丢了、或者忘记了，可以 <a href="mailto:kefu@filseclab.com?subject=我的授权码丢了">联系我们</a> 由我们的工作人员帮您查找，请务必在邮件中注明您的定单号、定单中的邮箱地址、注册激活时填写的邮箱地址（所有可能的）。</p>
      <h3>联系我们</h3>
      <el-divider></el-divider>
      <div class="bg">
        <p>如果您需要销售咨询、技术支持，或者在其他方面有问题和建议，请告诉我们。</p>
        <ul>
          <li>一般事务/技术支持：<a href="mailto:kefu@filseclab.com">kefu@filseclab.com</a></li>
          <li>新闻/媒体相关：<a href="mailto:press@filseclab.com">press@filseclab.com</a></li>
          <li>OEM/SDK/商务合作：<a href="mailto:partner@filseclab.com">partner@filseclab.com</a></li>
          <li>病毒举报：<a href="mailto:virus@filseclab.com">virus@filseclab.com</a></li>
          <li>误报举报：<a href="mailto:fp@filseclab.com">fp@filseclab.com</a></li>
        </ul>
      </div>
      <h3>分享</h3>
      <el-divider></el-divider>
      <Share></Share>
    </div>
  </div>
</template>

<script>
import Share from '@/components/Share.vue'
export default {
    name: 'Support',
    components:{
    Share
  },
}
</script>

<style lang='scss' scoped>
.box {
  background-image: linear-gradient(#ededed, #fff, #fff);
  padding-top: .6rem;
}
.container{
  width: 12rem;
  margin: auto;
  padding-bottom: .3rem;
}
h3{
 font-weight: normal;
 font-size: .22rem;
 color: #363636;
}
ul,p{
  font-size: .16rem;
  margin-bottom: .4rem;
  li{
    line-height: .26rem;
  }
  a{
      color: #e87f00;
      text-decoration: underline;
      &:hover{
        text-decoration: none;
        color: #363636;
      }
    }
}
.uldesc{
  list-style-type: disc;
  list-style-position: inside;
  padding-left: .3rem;
}
.bg{
  box-sizing: border-box;
  background: url(http://filseclab.com/images/ico_outlook.png) no-repeat right center;
}
</style>