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
        :ellipsis="false"
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
          style="width: 100px;height: 35px;"
        >登录</el-button>
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
            />{{ userName }}
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
import store from '../store/index'
import storage from '../utils/storage'
import avatar from '../assets/avatar.png';
import { ElNotification, ElMessageBox } from 'element-plus'

export default {
  setup () {
    const state = computed(() => useStore().state.client);
    const activeIndex = ref('home')
    const route = useRoute()
    const router = useRouter()

    const userName = ref('');

    const unLogin = computed(() => {
      return store.getters.getToken ? false : true;
    })

    // 获取个人信息
    const getinfo = () => {
      if (storage.get('info')) {
        userName.value = storage.get('info').userName;
      }
    }

    getinfo();

    watch(() => route.path, () => {
      activeIndex.value !== route.path.substring(1) ? activeIndex.value = route.path.substring(1) : null
    })
    const toInfo = () => {
      router.push({ name: 'UserInfo' });
    }
    const openPasswordDialog = () => {
      console.log('修改密码');
    }
    const quit = () => {
      ElMessageBox.confirm(
        '是否退出登录',
        'Warning',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          store.commit('delToken');
          storage.remove('info');
          ElNotification({
            title: 'Success',
            type: 'success',
            message: '退出成功',
            duration: 2000,
          });
        })
        .catch(() => {

        })
    }
    // 跳转登录页面
    const toLogin = () => {
      router.push({ name: 'Login' });
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
      userName
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
    justify-content: space-evenly;
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
        margin: 0 2px;
        &:hover {
          color: red !important;
          border-bottom-color: red !important;
          border-width: 3px !important;
        }
      }
      .is-active {
        border-bottom-color: red !important;
        color: red !important;
        border-width: 3px !important;
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
        outline: none !important;
      }
    }
  }
}
</style>