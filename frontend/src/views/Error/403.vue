<!--
 * @Author: [you name]
 * @Date: 2021-11-23 14:21:59
 * @LastEditors: [you name]
 * @LastEditTime: 2021-11-24 10:22:52
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \aaa\src\views\Error\403.vue
-->
<template>
  <div class="err_403">
    <div class="t1"></div>
    <div class="t2">
      <p class="err_word">抱歉，你无权访问该页面</p>
      <el-button size="mini" type="primary" @click="toHome">返回首页</el-button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import router from "@/router";
export default defineComponent({
  setup() {
    const toHome = () => {
      router.replace("/");
    };
    return {
      toHome,
    };
  },
});
</script>
<style lang="scss" scoped>
.err_403 {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  .t1 {
    position: absolute;
    top: 108px;
    left: 100px;
    width: 498px;
    height: 353px;
    background: url(~@/assets/error/403_p.png) no-repeat;
  }
  .t2 {
    position: absolute;
    top: 206px;
    left: 555px;
    width: 476px;
    height: 188px;
    background: url(~@/assets/error/403.png) no-repeat;
    .err_word {
        width: 100%;
        position: absolute;
        text-align: center;
        bottom: 17px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
    }
    .el-button {
        position: absolute;
        left: 126px;
        bottom: -36px;
        font-size: 14px;
        color: #fff;
    }
  }
}
</style>
