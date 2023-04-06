<template>
  <div class="container">
    <span class="neon">欢迎来到普法后台管理</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../assets/pufa_bg.webp") no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    text-align: center;
    transform: translateY(-100px);
    letter-spacing: 20px;
  }
  .neon {
    color: #cce7f8;
    font-size: 3.5rem;
    -webkit-animation: shining 0.5s alternate infinite;
    animation: shining 0.5s alternate infinite;
  }
  @keyframes shining {
      from {
          text-shadow: 0 0 10px lightblue, 0 0 20px lightblue, 0 0 30px lightblue, 0 0 40px skyblue, 0 0 50px skyblue, 0 0 60px skyblue;
      }
      to {
          text-shadow: 0 0 5px lightblue, 0 0 10px lightblue, 0 0 15px lightblue, 0 0 20px skyblue, 0 0 25px skyblue, 0 0 30px skyblue;
      }
  }
}
</style>
