<!--
 * @Author: your name
 * @Date: 2021-10-25 08:59:00
 * @LastEditTime: 2021-10-28 09:20:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_admin\src\views\Layout.vue
-->
<template>
<div class="layout">
  <Nav/>
  <div class="right">
    <Header/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs, watch } from 'vue'
import Nav from '@/components/Nav.vue'
import Header from '@/components/Header.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { Nav, Header },
  setup () {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
    })

    const computed = ()=> {
      if(document.body.clientWidth <= 900){
        store.state.system.isCollapse = true;
      }else {
        store.state.system.isCollapse = false;
      }
    }

    onMounted(()=>{
      computed();
      // 监听窗口的大小，适当时把侧边栏收起来或展开
      window.addEventListener('resize', computed)
    })
    onUnmounted(() => {
      window.removeEventListener('resize',()=>{
        return false;
      })
    })

    router.beforeEach((to, from, next) => {
      if (to.name == 'Home') {
        store.commit('SET_MAIN_MENU_ROUTER', {path: '', title: ''});
        store.commit('SET_SUB_MENU_ROUTER', {path: '', title: ''});
      }
      next()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang='scss'>
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  .right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ececec;
    width: calc(100% - 200px);
    .main {
      flex: 1;
      margin: 8px;
      overflow-x: auto;
      border-radius: 9px;
    }
  }
}
</style>
