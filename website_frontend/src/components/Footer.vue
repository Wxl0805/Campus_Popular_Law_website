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
  setup(){
    // const router = useRouter()
    return{
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  height: 0.48rem;
  background-color: #696969;
  color: #fff;
  font-size: .12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .footerBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>