<template>
  <div class="footer">
    <div class="footerBox">
      <span>大学校园普法网站</span>
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
  height: 0.48rem;
  background-color: #696969;
  color: #fff;
  font-size: 16px;
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