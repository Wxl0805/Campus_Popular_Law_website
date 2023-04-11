<template>
  <!-- 中文化处理 -->
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { reactive, toRefs } from "vue"
export default {
  name: "App",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup () {
    const state = reactive({
      locale: zhCn,
    })
    return {
      ...toRefs(state)
    };
  },
}
</script>

<style lang='scss'>
* {
  user-select: none;
}
.el-container {
  height: 100%;
}
</style>
