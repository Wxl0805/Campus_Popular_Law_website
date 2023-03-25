<template>
  <div class="login">
    <div class="login-body">
      <div class="txt">
        <p>欢迎登陆</p>
        <p>普法网站后台管理</p>
      </div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        @keyup.enter="submitForm"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="请输入您的用户名"
            size="medium"
            ref="userName"
            :spellcheck="false"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入您的密码"
            show-password
            size="medium"
            ref="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="remember">
          <el-checkbox v-model="remember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loginForm.isLoading"
            @click="submitForm"
            class="btn"
            size="medium"
          >登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, unref } from "vue";
import { useStore } from "vuex";
import router, { getRoutes } from "@/router";
import md5 from "js-md5";
import { loginApi } from "@/api/modules/login";
import { getRoleAuthorityApi } from "@/api/modules/role";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const store = useStore();
    const userName = ref(null);
    const password = ref(null);
    const remember = ref(false);
    const ruleForm = ref(null);
    // 表单对象
    const loginForm = reactive({
      userName: "",
      password: "",
      isLoading: false,
    });
    // 规则对象
    const rules = reactive({
      userName: [{ required: true, message: "* 未填写账号", trigger: "blur" }],
      password: [{ required: true, message: "* 未填写密码", trigger: "blur" }],
    });

    // 挂在后让用户名输入框获取焦点
    onMounted(() => {
      userName.value.focus();
    });

    // 设置cookie,清空就是设置天数为过去，比如负1天就好了
    const setCookie = (c_name: any, c_pwd: any, exdays: any) => {
      const exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toUTCString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toUTCString();
    };

    // 读取cookie值
    const getCookie = () => {
      if (document.cookie.length > 0) {
        // console.log("获取cookie document.cookie", document.cookie);
        var arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == "userName") {
            loginForm.userName = arr2[1];
          } else if (arr2[0] == "password") {
            loginForm.password = arr2[1];
          }
        }
      }
      if (loginForm.userName != "" && loginForm.password != "") {
        remember.value = true;
      } else {
        remember.value = false;
      }
    };
    // 页面加载默认读取
    getCookie();

    // 登录
    const submitForm = () => {
      const form = unref(ruleForm);
      if (!form) return;
      // 先对登录表单进行验证
      form.validate((valid: any) => {
        if (valid) {
          // 验证通过后进行设置或清楚cookie
          if (remember.value === true) {
            setCookie(loginForm.userName, loginForm.password, 7);
          } else {
            setCookie(loginForm.userName, loginForm.password, -1);
          }
          // 打开加载
          loginForm.isLoading = true;
          // 调用登录接口
          loginApi({
            userName: loginForm.userName,
            password: md5(loginForm.password),
          }).then((res: any) => {
            // 关闭加载
            loginForm.isLoading = false;
            if (res.code === "0000000") {
              localStorage.setItem("token", res.token);
              // 保存用户信息
              store.dispatch("LOGIN", res.data);
              localStorage.setItem("userName", loginForm.userName);
              getRoleAuthorityApi({ roleId: res.data.roleId }).then(
                (ret: any) => {
                  if (ret.code === "0000000") {
                    ElMessage.success("登录成功！");
                    const arr = [];
                    if (ret.data.length > 0) {
                      ret.data.forEach((item) => {
                        arr.push(item.authorityUrl);
                      });
                    }
                    store.commit("SET_ROLELIST", arr);
                    setTimeout(() => {
                      getRoutes(store);
                      // 登录跳转
                      router.push("/");
                    });
                  } else {
                    ElMessage.error("权限获取失败");
                    localStorage.removeItem("token");
                  }
                }
              );
            } else if (res.code === "1000003") {
              // 当用户名或密码错误时
              loginForm.password = "";
              password.value.focus();
            }
          });
        } else {
          return false;
        }
      });
    };

    return {
      userName,
      password,
      remember,
      loginForm,
      rules,
      ruleForm,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgb(206, 226, 254);
  background-image: url(~@/assets/loginbg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .login-body {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-height: 350px;
    width: 350px;

    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 2px 20px 10px rgba(0, 0, 0, 0.1),
      0px 2px 4px 8px rgba(74, 144, 226, 0.05);
    border-radius: 10px;
    .txt {
      margin-top: 30px;
      font-size: 22px;
      line-height: 30px;
      color: #33475b;
    }
    .el-form {
      display: flex;
      flex-direction: column;
      padding: 20px 50px;
      :deep(.el-input__inner) {
        background-color: rgba(255, 255, 255, 0.8);
      }
      :deep(.el-form-item.is-error) {
        .el-input__inner {
          border-color: rgb(209, 107, 89);
        }
        .el-form-item__error {
          color: rgb(209, 107, 89);
        }
      }
      .remember {
        text-align: left;
        line-height: 0;
        margin: 0;
        :deep(.el-checkbox__inner) {
          border: 1px solid rgb(212, 210, 210);
        }
      }
      .btn {
        width: 100%;
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    bottom: 20px;
    text-align: center;
  }
}
@media (min-width: 900px) {
  .login {
    .login-body {
      left: auto;
      right: 150px;
      max-height: 385px;
      width: 400px;
      .txt {
        margin-top: 40px;
        font-size: 26px;
        line-height: 35px;
      }
      .el-form {
        padding: 25px 50px;
      }
    }
  }
}

@media (min-width: 1500px) {
  .login {
    .login-body {
      left: auto;
      right: 200px;
      max-height: 420px;
      width: 450px;
      .txt {
        margin-top: 50px;
        font-size: 30px;
        line-height: 42px;
      }
      .el-form {
        padding: 30px 50px;
      }
    }
  }
}
</style>
