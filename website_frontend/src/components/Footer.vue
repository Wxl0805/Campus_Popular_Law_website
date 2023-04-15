<template>
  <div class="footer">
    <div class="footerBox">
      <span style="margin-right: 30px;">大学校园普法网站</span>
      <a href="https://beian.miit.gov.cn">赣ICP备2023003401号</a>
    </div>
  </div>
</template>

<script>
// import { useRouter } from 'vue-router'
export default {
  setup () {
    // const router = useRouter()
    return {
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 0.4rem;
  background-color: #696969;
  color: #fff;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  .footerBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>