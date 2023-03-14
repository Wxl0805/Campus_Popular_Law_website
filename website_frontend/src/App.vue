<template>
  <div>
    <el-config-provider :locale="locale">
      <Header v-if="route.name !== 'Login' && route.name !== 'Logout'" />
      <div
        class="main"
        v-if="route.name !== 'Login' && route.name !== 'Logout'"
      >
        <router-view />
      </div>
      <div v-else>
        <router-view />
      </div>
      <Footer />
    </el-config-provider>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { onBeforeMount, ref } from '@vue/runtime-core';
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useRouter, useRoute } from "vue-router";

export default {
  components: {
    Header,
    Footer,
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup () {
    const route = useRoute(); //路由参数
    const router = useRouter(); //跳转路由
    const store = useStore()
    const state = ref('pc')
    const setMode = () => {
      state.value = 'pc'
      store.commit('setWidth', 'pc')
      return
      // let w=document.documentElement.clientWidth;
      // if(w>960){
      //   state.value = 'pc'
      //   store.state.client==='mobile'?store.commit('setWidth','pc'):null
      //   return
      // }
      // state.value = 'mobile'
      // store.state.client==='pc'?store.commit('setWidth','mobile'):null
    }
    onBeforeMount(setMode)
    window.addEventListener('resize', setMode)
    return {
      state,
      locale: zhCn,
      route,
      router,
    }
  }
}
</script>

<style lang="scss">
.main {
  padding: 94px 20px 20px 20px;
}
</style>
