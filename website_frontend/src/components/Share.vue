<template>
  <div class="shareBtn">
    <a href="http://filseclab.com/zh-cn/products/twister.htm#"></a>
    <a href="http://filseclab.com/zh-cn/products/twister.htm#"></a>
    <a href="http://filseclab.com/zh-cn/products/twister.htm#"></a>
    <a href="http://filseclab.com/zh-cn/products/twister.htm#"></a>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.shareBtn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.2rem;
}
a {
  display: block;
  width: 0.37rem;
  height: 0.37rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 97%;
  background-image: url(http://bdimg.share.baidu.com/static/images/is_32.png?cdnversion=20131219);
  margin-right: 0.1rem;
  &:nth-of-type(1) {
    background-position: 0 -75px;
  }
  &:nth-of-type(2) {
    background-position: 0 -115px;
  }
  &:nth-of-type(3) {
    background-position: 0 -235px;
  }
  &:nth-of-type(4) {
    background-position: 0 -195px;
  }
}
</style>