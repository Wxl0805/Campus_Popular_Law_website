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

    <!-- 修改密码弹窗 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="修改密码"
      width="600px"
      destroy-on-close
      @close="cancel"
    >
      <el-form
        :model="form"
        ref="formref"
        :rules="rules"
      >
        <el-form-item
          label="原密码"
          prop="oldpassword"
        >
          <el-input
            v-model="form.oldpassword"
            clearable
            show-password
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            clearable
            show-password
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="confirmpassword"
        >
          <el-input
            v-model="form.confirmpassword"
            clearable
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button
            type="primary"
            @click="submit(formref)"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import store from '../store/index'
import storage from '../utils/storage'
import avatar from '../assets/avatar.png';
import { setPassword } from '../api/user';
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
      dialogFormVisible.value = true;
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

    // 修改密码
    const dialogFormVisible = ref(false);
    const form = reactive({
      oldpassword: '',
      password: '',
      confirmpassword: ''
    })

    const formref = ref(null);
    const passreg = /^([0-9]|[a-zA-Z]){6,16}$/;
    const validatorOldassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入原密码'));
      } else {
        callback();
      }
    }
    const validatorPassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入新密码'));
      } else if (!passreg.test(value)) {
        callback(new Error('密码长度必须为6-16位'));
      } else {
        callback();
      }
    }
    const validatorConfirmassword = (rule, value, callback) => {
      if (value != form.password) {
        callback(new Error('密码不一致，请重新输入'));
      } else {
        callback();
      }
    }
    const rules = reactive({
      oldpassword: [{ validator: validatorOldassword, trigger: 'blur' }],
      password: [{ validator: validatorPassword, trigger: 'blur' }],
      confirmpassword: [{ validator: validatorConfirmassword, trigger: 'blur' }]
    })

    // 提交密码
    const submit = (formEl) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          try {
            const data = await setPassword({ userId: storage.get('info').userId, oldpassword: form.oldpassword, password: form.password })
            if (data.code == '0') {
              ElNotification({
                title: 'Success',
                type: 'success',
                message: '修改成功',
                duration: 2000,
              });
              dialogFormVisible.value = false;
              resetform();
            }
          } catch (error) {
            // console.log(error);
          }
        } else {
          // console.log('error submit!')
          return false
        }
      })
    }

    // 清空密码输入框的值
    const resetform = () => {
      form.oldpassword = '';
      form.password = '';
      form.confirmpassword = '';
    }

    // 取消按钮事件
    const cancel = () => {
      resetform();
      dialogFormVisible.value = false;
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
      userName,
      dialogFormVisible,
      form,
      rules,
      formref,
      submit,
      cancel
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
  :deep(.el-dialog__header) {
    display: flex;
  }
  :deep(.el-dialog__footer) {
    display: flex;
    justify-content: flex-end;
  }
  :deep(.dialog-footer) {
    display: flex;
  }
}
</style>