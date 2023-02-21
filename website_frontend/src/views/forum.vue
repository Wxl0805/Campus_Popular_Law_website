<template>
  <div class="box">
    <div class="container">
      <a href="http://bbs.filseclab.com/" target="_blank">官方论坛</a>
      <el-divider></el-divider>
      <a href="http://bbs.filseclab.com/" target="_blank">
        <img src="http://filseclab.com/images/partner_ftfans.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Forum'
}
</script>

<style lang='scss' scoped>
.box {
  background-image: linear-gradient(#ededed, #fff, #fff);
  padding-top: .6rem;
  font-size: 0;
  min-height: 76vh;
}
.container{
  width: 12rem;
  margin: auto;
  padding-bottom: .3rem;
}
a{
   color: #e87f00;
   font-size: .22rem;
   &:hover{
     color: #363636;
   }
}
</style>