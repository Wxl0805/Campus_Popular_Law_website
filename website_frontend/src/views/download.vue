<template>
  <div class="box">
    <div class="container">
      <div class="section" v-for="(item,index) in downloadData" :key="index">
        <div class="logo"><img :src="item.img" alt=""></div>
        <div class="desc">
          <h2 class="title">
            {{item.title}}
            <sup v-if="item.subtitle">{{item.subtitle}}</sup>
          </h2>
          <p>版本：{{item.version}}</p>
          <p>发布日期：{{item.date}}</p>
          <p>文件大小：{{item.size}}</p>
          <p>软件性质：{{item.property}}</p>
          <p>操作系统：{{item.os}}</p>
          <div class="dld">
            下载地址：
            <a v-for="(iten,inde) in item.dld" :key="inde+'dl'" :href="iten" class="mirror">镜像{{inde+1}}</a>
          </div>
          <div v-if="item.updatePackage">
            <el-divider></el-divider>
            <h3 class="updatePackage">病毒库离线升级包</h3>
            <p>版本：{{item.updatePackage.version}}</p>
            <p>发布日期：{{item.updatePackage.date}}</p>
            <p>文件大小：{{item.updatePackage.size}}</p>
            <div class="dld">
              下载地址：
              <a v-for="(ite,ind) in item.updatePackage.dld" :key="ind+'a'" :href="ite" class="mirror">镜像{{ind+1}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Download",
  setup(){
    const downloadData = [{
      img: 'http://filseclab.com/images/logo_twister8.png',
      title: '费尔智能杀毒 8',
      subtitle: '适用于64位/32位Windows',
      version: '8.17',
      date: '2014/04/01',
      size: '180M',
      property: '共享，免费试用90天激活码: 8BB5-F475-576B-41D1-1881',
      os: '适用于64位/32位 Windows 10/XP/Vista/7/8/8.1/2003/2008/NT4/2000/98/ME',
      dld: ['http://update2.filseclab.com/down/twister8_setup.exe','http://dl.filseclab.com/down/twister8_setup.exe','http://fdrfilup.filseclab.com/down/twister8_setup.exe'],
      updatePackage: {
        version: '2021.07.06.06:55',
        date: '2021/07/06',
        size: '307585.50K',
        dld: ['http://update6.filseclab.com/update/twister_virdef_210706_0655.exe','http://fdrfilup.filseclab.com/update/twister_virdef_210706_0655.exe']
      }
    },{
      img: 'http://filseclab.com/images/logo_twister7.png',
      title: '费尔托斯特安全 V7',
      subtitle: '仅用于32位Windows',
      version: '7.34',
      date: '2012/09/29',
      size: '154M',
      property: '共享，免费试用90天激活码: 8BB5-F475-576B-41D1-1881',
      os: '仅用于32位 Windows 95/98/ME/NT/2000/XP/2003/Vista/7/8/2008',
      dld: ['http://fdrfilup.filseclab.com/down/twister7_setup_cn.exe','http://dl.filseclab.com/down/twister7_setup_cn.exe'],
      updatePackage: {
        version: '2021.07.06.06:55',
        date: '2021/07/06',
        size: '307585.50K',
        dld: ['http://update6.filseclab.com/update/twister_virdef_210706_0655.exe','http://fdrfilup.filseclab.com/update/twister_virdef_210706_0655.exe']
      }
    },{
      img: 'http://filseclab.com/images/logo_firewall.gif',
      title: '费尔个人防火墙专业版',
      subtitle: undefined,
      version: '3.0',
      date: '2005/07/29',
      size: '4.30M',
      property: '免费',
      os: '仅用于32位 Windows 95/98/ME/NT/2000/XP/2003',
      dld: ['http://fdrfilup.filseclab.com/down/xfilter_3.0_cn.zip','http://dl.filseclab.com/down/xfilter_3.0_cn.zip'],
      updatePackage: undefined
    },{
      img: 'http://filseclab.com/images/logo_netguard.gif',
      title: '费尔网络监护专家',
      subtitle: undefined,
      version: '3.6',
      date: '2005/07/29',
      size: '6.04M',
      property: '共享，免费试用14天',
      os: '仅用于32位 Windows 95/98/ME/NT/2000/XP/2003',
      dld: ['http://fdrfilup.filseclab.com/down/xnetgdn_cn.zip','http://dl.filseclab.com/down/xnetgdn_cn.zip'],
      updatePackage: undefined
    }]
    return {
      downloadData
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-image: linear-gradient(#ededed, #fff, #fff);
  padding-top: .6rem;
}
.container {
  width: 12rem;
  margin: auto;
}
.section{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: .01rem solid lightgray;
  margin-bottom: .4rem;
  &:nth-last-of-type(1){
    border-bottom: none;
  }
  .logo{
    width: 20%;
    img{
      width: 90%;
    }
  }
  .desc{
    width: 78%;
    margin-bottom: .4rem;
    .title{
      line-height: .5rem;
      font-size: .22rem;
      font-weight: normal;
      color: #363636;
      sup{
        font-size: 70%;
        color: #ff9900;
      }
    }
    p{
      line-height: .3rem;
      font-size: .16rem;
    }
    .dld{
      font-size: .16rem;
    }
    .updatePackage{
      font-weight: normal;
      color: #6ebe00;
      font-size: .18rem;
      margin-bottom: .24rem;
    }
    .mirror{
      color: #e87f00;
      text-decoration: underline;
      margin-right: .1rem;
      &:hover{
        color: #333;
        text-decoration: none;
      }
    }
  }
}
</style>