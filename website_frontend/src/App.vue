<template>
  <div>
    <Header />
    <div class="main">
      <router-view />
    </div>
    <div v-if="state==='pc'">
      <Footer />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { onBeforeMount, ref } from '@vue/runtime-core';
export default {
  components:{
      Header,
      Footer
  },
  setup(){
    const store=useStore()
    const state = ref('pc')
    const setMode=()=>{
        state.value = 'pc'
        store.commit('setWidth','pc')
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
    window.addEventListener('resize',setMode)
    return {
      state
    }
  }  
}
</script>

<style lang="scss">
  .main {
    padding: 94px 20px 20px 20px;
  }
</style>
