<template>
  <div :class="state">
    <div class="container">
        <!-- 左侧logo -->
      <a href="">
        <img src="@/assets/pufa_logo1.jpeg" alt="" />
      </a>
      <!-- 右侧导航 -->
      <el-menu v-if="state==='pc'" :default-active="activeIndex" mode="horizontal" text-color='#464646' active-text-color='#898989' router>
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="news">新闻动态</el-menu-item>
        <el-menu-item index="videozone">视频专区</el-menu-item>
        <el-menu-item index="feedbackmessage">反馈留言</el-menu-item>
      </el-menu>
      <!-- 右侧注册登录或者个人信息 -->
      <div class="info">
        <el-button round>注册</el-button>
        <el-button round>登录</el-button>
      </div>
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
    position: fixed;
    z-index: 22;
    background: #fff;
    width: 100%;
  .container {
    width: 12rem;
    height: 1rem;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    user-select: none;
    a{
        font-size: 0;
        img {
          width: 130px;
          height: 100%;
        }
    }
    .el-menu{
        border: none;
        .el-menu-item{
            font-size: .18rem;
        }
        .is-active{
          border-bottom-color:red !important;
          color: red !important;
        }
    }
    .info {
      width: 200px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>