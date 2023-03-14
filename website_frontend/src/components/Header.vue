<template>
  <div :class="state">
    <div class="container">
      <!-- 左侧logo -->
      <a href="">
        <img
          src="@/assets/pufa_logo1.jpeg"
          alt=""
        />
      </a>
      <!-- 右侧导航 -->
      <el-menu
        v-if="state==='pc'"
        :default-active="activeIndex"
        mode="horizontal"
        text-color='#464646'
        active-text-color='#898989'
        router
      >
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="news">新闻动态</el-menu-item>
        <el-menu-item index="videozone">视频专区</el-menu-item>
        <el-menu-item index="feedbackmessage">反馈留言</el-menu-item>
      </el-menu>
      <!-- 右侧注册登录或者个人信息 -->
      <div
        class="info"
        v-if="unLogin"
      >
        <el-button
          round
          @click="toLogin"
        >登录</el-button>
        <el-button
          round
          @click="toLogout"
        >注册</el-button>
      </div>
      <div
        class="info"
        v-else
      >
        <el-dropdown>
          <div class="dropdown-style">
            <el-avatar
              :size="30"
              :src="avatar"
            />伍禧龙
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toInfo">个人信息</el-dropdown-item>
              <el-dropdown-item
                @click="openPasswordDialog">修改密码</el-dropdown-item>
              <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import avatar from '../assets/avatar.png';

export default {
  setup () {
    const state = computed(() => useStore().state.client);
    const activeIndex = ref('home')
    const route = useRoute()
    const router = useRouter()

    const unLogin = ref(true);
    watch(() => route.path, () => {
      activeIndex.value !== route.path.substring(1) ? activeIndex.value = route.path.substring(1) : null
    })
    const toInfo = () => {
      console.log('个人信息');
    }
    const openPasswordDialog = () => {
      console.log('修改密码');
    }
    const quit = () => {
      console.log('退出登录');
    }
    // 跳转登录页面
    const toLogin = () => {
      router.push({ name: 'Login' });
    }
    // 跳转注册页面
    const toLogout = () => {
      router.push({ name: 'Logout' });
    }
    return {
      unLogin,
      state,
      activeIndex,
      avatar,
      toInfo,
      openPasswordDialog,
      quit,
      toLogin,
      toLogout,
    };
  },
};
</script>

<style lang='scss' scoped>
.pc {
  position: fixed;
  z-index: 22;
  background: #fff;
  width: 100%;
  // box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  .container {
    // width: 12rem;
    // height: 1rem;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    user-select: none;
    a {
      font-size: 0;
      img {
        width: 130px;
        height: 100%;
      }
    }
    .el-menu {
      border: none;
      .el-menu-item {
        font-size: 0.18rem;
        &:hover {
          color: red !important;
        }
      }
      .is-active {
        border-bottom-color: red !important;
        color: red !important;
      }
    }
    .info {
      width: 200px;
      display: flex;
      justify-content: center;
      .dropdown-style {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>