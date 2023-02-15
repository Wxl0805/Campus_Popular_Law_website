<template>
  <div class="home">
    <h2>欢迎登录XXX系统</h2>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  setup(){
    return {}
  } 
})
</script>

<style lang="scss" scoped>
  .home {
    h2 {
      margin-top: 200px;
      text-align: center;
      font-size: 30px;
    }
  }
</style>