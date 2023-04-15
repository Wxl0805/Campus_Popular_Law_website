<template>
  <div class="login-bg">
    <div
      class="back-home"
      @click="toHome"
    >返回首页</div>
    <div class="info">
      <el-icon :size="20">
        <WarningFilled />
      </el-icon>
      <span>学生和教师无需注册，请联系班级管理员获取账号</span>
    </div>
    <div class="right-nav border">
      <div class="title">用户登录</div>
      <div class="user-tab">
        <div
          class="user-student"
          :class="{active: isStudent}"
          @click="isStudent = true"
        >我是学生</div>
        <div
          class="user-teacher"
          :class="{active: !isStudent}"
          @click="isStudent = false"
        >我是教师</div>
      </div>
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
        >
          <el-form-item
            :rules="[
        {
          required: true,
          message: '请输入学校下发账号',
          trigger: 'blur',
        },
      ]"
            prop="userid"
          >
            <el-input
              v-model="ruleForm.userid"
              clearable
              placeholder="请输入学校下发账号"
            >
              <template #prepend>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            :rules="[
        {
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        },
      ]"
            prop="username"
          >
            <el-input
              v-model="ruleForm.username"
              clearable
              placeholder="请输入姓名"
            >
              <template #prepend>
                <el-icon>
                  <Avatar />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            style="margin-bottom: 0;"
            :rules="[
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      ]"
            prop="password"
          >
            <el-input
              v-model="ruleForm.password"
              type="passoword"
              clearable
              show-password
              placeholder="默认密码为账号后六位"
            >
              <template #prepend>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="forgetPass"><span @click="forgetPassword">忘记密码</span></div>
          </el-form-item>
          <el-form-item>
            <el-button
              class="submit"
              @click="submit(ruleFormRef)"
              :loading="isloading"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="admin-login">
        <a
          href="127.0.0.1:8082/#/login"
          target="_blank"
        >管理员登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store/index'
import { login } from '../api/login';
import { ElNotification } from 'element-plus' // 提示信息
import storage from '../utils/storage'
export default {
  name: 'Login',
  setup () {
    // const route = useRoute()
    const router = useRouter()
    const isStudent = ref(true);

    const ruleFormRef = ref('')
    const ruleForm = reactive({
      userid: '',
      username: '',
      password: '',
      identity: 1,
    });

    const isloading = ref(false);
    // 提交表单，登录
    const submit = (formEl) => {
      if (!formEl) return
      formEl.validate(async (valid) => {
        if (valid) {
          isloading.value = true;
          const data = await login({ userId: ruleForm.userid, userName: ruleForm.username, password: ruleForm.password, identity: isStudent.value ? 1 : 0 })
          if (data.code == '0') {
            store.commit('setToken', data.token);
            storage.set('info', data.data);
            ElNotification({
              title: 'Success',
              type: 'success',
              message: '登录成功',
              duration: 2000,
            });
            setTimeout(() => {
              isloading.value = false;
              router.push({ path: '/home' });
              isloading.value = false;
            }, 500)
          } else {
            isloading.value = false;
          }
        } else {
          return false
        }
      })
    }

    // 跳转到首页
    const toHome = () => {
      router.push({ name: 'Home' });
    }

    // 忘记密码
    const forgetPassword = () => {
      ElNotification({
        title: 'Info',
        type: 'info',
        message: '请联系班级管理员进行密码重置',
        duration: 3000,
      });
    }

    return {
      isStudent,
      ruleForm,
      toHome,
      ruleFormRef,
      submit,
      isloading,
      forgetPassword
    }
  }
}
</script>

<style lang="scss" scoped>
.login-bg {
  width: 100%;
  height: 100vh;
  // min-width: 1300px;
  background-image: url("../assets/loginBg.jpeg");
  background-repeat: no-repeat;
  object-fit: contain;
  position: relative;
  // background-size: cover;
  .info {
    font-size: 16px;
    color: red;
    position: absolute;
    top: 35px;
    right: 100px;
    display: flex;
    align-items: center;
  }

  .back-home {
    font-size: 21px;
    color: rgb(106, 106, 243);
    position: absolute;
    top: 5px;
    right: 100px;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: blue;
    }
  }
  .right-nav {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 100px;
    .title {
      font-size: 30px;
      text-align: center;
    }
    .user-tab {
      width: 100%;
      height: 40px;
      margin-top: 20px;
      font-size: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
      .active {
        border-bottom: 2px solid red;
        color: red;
      }
    }
    .form {
      width: 100%;
      height: 300px;
      margin-top: 50px;
      display: flex;
      justify-content: center;
      div {
        width: 400px;
        height: 40px;
      }
      .forgetPass {
        text-align: right;
        span {
          font-size: 13px;
          cursor: pointer;
          user-select: none;
          &:hover {
            color: red;
          }
        }
      }
      .submit {
        width: 100%;
        height: 40px;
        font-size: 18px;
      }
    }
    .admin-login {
      font-size: 20px;
      color: rgb(106, 106, 243);
      text-align: center;
      a {
        color: rgb(106, 106, 243);
        cursor: pointer;
        user-select: none;
        &:hover {
          color: blue;
        }
      }
    }
  }
}

// 边框样式
.border {
  border: 2px solid rgb(199, 186, 186); /* 将边框颜色替换为红色 */
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(195, 192, 192, 0.2); /* 将阴影颜色替换为红色 */
  position: relative;
  overflow: hidden;
}

.border::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 0, 0, 0),
    rgba(213, 211, 211, 0.3)
  ); /* 将渐变颜色替换为红色 */
  transition: all 0.3s ease-in-out;
  z-index: -1;
}

.border::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 0, 0, 0),
    rgba(213, 211, 211, 0.3)
  ); /* 将渐变颜色替换为红色 */
  transition: all 0.3s ease-in-out;
  z-index: -1;
}

.border::before,
.border::after {
  opacity: 0;
}

.border:hover::before,
.border:hover::after {
  opacity: 1;
}
</style>