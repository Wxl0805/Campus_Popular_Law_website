<!--
 * @Author: [吴志远]
 * @Date: 2022-02-19 10:01:09
 * @LastEditors: [吴志远]
 * @LastEditTime: 2022-02-19 10:46:11
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\App.vue
-->
<template>
<!-- 中文化处理 -->
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { defineComponent, reactive, toRefs } from "vue"
export default defineComponent({
  name: "App",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {
    const state = reactive({
      locale: zhCn,
    })
    return {
      ...toRefs(state)
    };
  },
}) 
</script>

<style lang='scss'>
* {
  user-select: none;
}
.el-container {
  height: 100%;
}
</style>
