<template>
  <div :class="state">
    <div class="container">
        <!-- 左侧logo -->
      <a href="http://filseclab.com/">
        <img src="http://filseclab.com/images/logo_zh-cn.png" alt="" />
      </a>
      <!-- 右侧导航 -->
      <el-menu v-if="state==='pc'" :default-active="activeIndex" mode="horizontal" text-color='#464646' active-text-color='#898989' router>
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="product">产品</el-menu-item>
        <el-menu-item index="download">下载</el-menu-item>
        <el-menu-item index="support">支持</el-menu-item>
        <el-menu-item index="forum">论坛</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'
export default {
  setup() {
    const state = computed(() => useStore().state.client);
    const activeIndex = ref('home')
    const route = useRoute()
    watch(()=>route.path,()=>{
      activeIndex.value!==route.path.substring(1)?activeIndex.value=route.path.substring(1):null
    })
    return {
      state,
      activeIndex
    };
  },
};
</script>

<style lang='scss'>
.pc {
  .container {
    width: 12rem;
    height: 1rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    a{
        font-size: 0;
    }
    .el-menu{
        border: none;
        .el-menu-item{
            font-size: .18rem;
        }
        .is-active{
          border-bottom-color:#f90 !important;
          color: #f80 !important;
        }
    }
  }
}
.mobile{
  .container{
    font-size: 0;
    box-sizing: border-box;
    padding: .2rem .1rem;
    a{
      img{
        width: 2.5rem;
      }
    }
  }
}
</style>