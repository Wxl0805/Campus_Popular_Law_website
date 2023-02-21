<template>
  <div>
    <Header />
    <router-view />
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
      let w=document.documentElement.clientWidth;
      if(w>960){
        state.value = 'pc'
        store.state.client==='mobile'?store.commit('setWidth','pc'):null
        return
      }
      state.value = 'mobile'
      store.state.client==='pc'?store.commit('setWidth','mobile'):null
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

</style>
