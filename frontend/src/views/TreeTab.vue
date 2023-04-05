<template>
  <div class="container">
    <span>欢迎来到普法后台管理</span>
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
    font-size: 3.125em;
    font-weight: 600;
    text-align: center;
    transform: translateY(-100px);
  }
}
</style>
