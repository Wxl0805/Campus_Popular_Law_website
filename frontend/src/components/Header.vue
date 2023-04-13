<template>
  <div class="header">
    <div class="left">
      <expand
        v-if="isCollapse"
        @click="toggleCollapse"
      />
      <fold
        v-else
        @click="toggleCollapse"
      />
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="mainMenuRouter.path">
          <router-link
            :to="mainMenuRouter.path"
            @click="mainMenuRouterClick"
          >{{mainMenuRouter.title}}</router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="subMenuRouter.path">
          <router-link
            :to="subMenuRouter.path">{{subMenuRouter.title}}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown
        @command="handleCommand"
        style="cursor: pointer;"
      >
        <span class="el-dropdown-link">
          <el-avatar
            :size="36"
            :src="avatar || require('@/assets/nophoto.png')"
            fit="fill"
          ></el-avatar>
          <span class="username">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changeAccount" v-if="showCom">
              <p>账号信息</p>
            </el-dropdown-item>
            <el-dropdown-item command="changePass" v-if="showCom">
              <p>修改密码</p>
            </el-dropdown-item>
            <el-dropdown-item command="logOut">
              <p>退出登录</p>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 修改账号信息 -->
  <div class="account-dialog">
    <el-dialog
      title="账户信息"
      v-model="showChangeAccount"
      @closed="closeAccountDialog"
      :close-on-click-modal="false"
      top="50px"
    >
      <el-form
        :model="accountInfo"
        status-icon
        :rules="accountFromRules"
        ref="accountFrom"
        label-width="100px"
      >
        <el-form-item
          label="登录账号："
          prop="userName"
        >
          <el-input
            size="small"
            placeholder="请输入用户名"
            v-model.sync.trim="accountInfo.userName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名："
          prop="name"
        >
          <el-input
            size="small"
            placeholder="请输入用户姓名"
            v-model.trim="accountInfo.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话："
          prop="mobile"
        >
          <el-input
            size="small"
            placeholder="请输入联系电话"
            v-model.trim="accountInfo.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input
            size="small"
            placeholder="请输入邮箱"
            v-model="accountInfo.email"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="班级管理："
          prop="classId"
        >
          <el-select
            size="small"
            v-model="accountInfo.classId"
            placeholder="请选择班级"
            filterable
          >
            <el-option
              v-for="item in deptOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="角色："
          prop="roleId"
        >
          <el-select
            size="small"
            v-model="accountInfo.roleId"
            placeholder="请选择角色"
            filterable
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户头像：">
          <el-upload
            class="myavatar"
            action="#"
            :show-file-list="false"
            :http-request="uploadImg"
            :before-upload="beforeUpload"
          >
            <img
              v-if="accountInfo.avatar"
              :src="accountInfo.avatar || require('@/assets/nophoto.png')"
              class="avatar"
            >
            <i
              v-else
              class="fa-plus"
            ></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="showChangeAccount=false"
          >取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="submitAccountForm"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- 修改密码 -->
  <div class="password-dialog">
    <el-dialog
      title="修改密码"
      v-model="showChangePass"
      @closed="closePassDialog"
      @opened="openPassDialog"
      :close-on-click-modal="false"
    >
      <el-form
        :model="passInfo"
        status-icon
        :rules="passFormRules"
        ref="passFrom"
        label-width="100px"
      >
        <el-form-item
          label="旧密码"
          prop="oldPassword"
        >
          <el-input
            ref="oldPassword"
            type="password"
            v-model.trim="passInfo.oldPassword"
            autocomplete="off"
            size="small"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
        >
          <el-input
            type="password"
            v-model.trim="passInfo.newPassword"
            autocomplete="off"
            size="small"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="checkPassword"
        >
          <el-input
            type="password"
            v-model.trim="passInfo.checkPassword"
            autocomplete="off"
            size="small"
            placeholder="再次输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="showChangePass=false"
          >取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="submitPassForm"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  watch,
  onMounted,
  unref,
  nextTick,
} from "vue";
import { useStore } from "vuex";
import router from "@/router";
import md5 from "js-md5";
import { ElMessageBox, ElMessage } from "element-plus";
import { Expand, Fold, Bell } from "@element-plus/icons-vue";
import {
  validateUserName,
  validateName,
  validatePass,
  validatePhone,
  validateEmail,
} from "@/utils/validateFunction";
import { modifyUserApi, modifyPassApi } from "@/api/modules/user";
import { getAllClassApi } from "@/api/modules/class";
import { getAllRoleApi, getRoleAuthorityApi } from "@/api/modules/role";
import { getRoutes } from "@/router";
import axios from "axios";
export default defineComponent({
  components: { Expand, Fold, Bell },
  setup(props) {
    // 确认密码验证
    const validateCheckPass = (rule: any, value: any, callback: Function) => {
      if (value !== state.passInfo.newPassword) {
        callback(new Error("两次输入密码不一致!"));
        state.passInfo.checkPassword = "";
      } else {
        callback();
      }
    };
    const store = useStore();
    const state = reactive({
      // 面包屑第一层
      mainMenuRouter: store.state.system.mainMenuRouter,
      // 面包屑第二层
      subMenuRouter: store.state.system.subMenuRouter,
      // 控制侧边栏是否展开
      isCollapse: store.state.system.isCollapse,
      // 用户名字
      name: store.state.user.name,
      // 用户头像
      avatar: store.state.user.avatar,
      // 是否显示用户信息弹层
      showChangeAccount: false,
      // 是否显示修改密码弹层
      showChangePass: false,
      // 密码弹层表单
      passInfo: {
        oldPassword: "",
        newPassword: "",
        checkPassword: "",
      },
      // 密码表单验证规则
      passFormRules: {
        oldPassword: [
          { required: true, message: "请输入原始密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validateCheckPass, trigger: "blur" },
        ],
      },
      // 账户信息表单
      accountInfo: {
        userId: null,
        userName: "",
        name: "",
        roleId: null,
        mobile: "",
        avatar: "",
        classId: null,
        email: "",
      },
      // 账户表单验证规则
      accountFromRules: {
        userName: [
          { required: true, validator: validateUserName, trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, validator: validateName, trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur",
          },
        ],
        mobile: [{ validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        classId: [{ required: true, message: "请选择班级", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      // 班级选项
      deptOptions: [],
      // 角色选项
      roleOptions: [],
    });

    // 密码表单的虚拟dom
    const passFrom = ref(null);
    // 旧密码输入框
    const oldPassword = ref(null);
    // 账户信息表单的虚拟dom
    const accountFrom = ref(null);

    // 切换侧边栏展开和收缩
    const toggleCollapse = () => {
      store.state.system.isCollapse = !store.state.system.isCollapse;
    };

    const showCom = ref(true);
    const startCom = () => {
      // 暂时有bug
      if(JSON.parse(localStorage.getItem('vuex')).user.roleId == 3001){
        showCom.value = true;
      } else {
        showCom.value = false;
      }
    }
    startCom();

    // 获取所有班级
    const getAllClasses = async () => {
      const res: any = await getAllClassApi();
      if (res.code == 0) {
        state.deptOptions.length = 0;
        res.data.forEach((item: any) => {
          state.deptOptions.push({
            value: item.classId,
            label: item.className,
          });
        });
      }
    };

    // 获取所有角色
    const getAllRoles = async () => {
      const res: any = await getAllRoleApi();
      if (res.code == 0) {
        state.roleOptions.length = 0;
        res.data.forEach((item: any) => {
          state.roleOptions.push({
            value: item.roleId,
            label: item.roleName,
          });
        });
      }
    };

    // 下拉菜单点击
    const handleCommand = (command: string) => {
      if (command === "changeAccount") {
        state.showChangeAccount = true;
        getAllClasses();
        getAllRoles();
        nextTick(() => {
          state.accountInfo.userId = store.state.user.userId;
          state.accountInfo.userName = store.state.user.userName;
          state.accountInfo.name = store.state.user.name;
          state.accountInfo.roleId = store.state.user.roleId;
          state.accountInfo.mobile = store.state.user.mobile;
          state.accountInfo.avatar = store.state.user.avatar;
          state.accountInfo.classId = store.state.user.classId;
          state.accountInfo.email = store.state.user.email;
        });
      } else if (command === "changePass") {
        state.showChangePass = true;
      } else if (command === "logOut") {
        ElMessageBox.confirm("是否退出登录？", {
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          type: "warning",
        })
          .then(async () => {
            // 无接口法退出(有点不严谨)
            store.dispatch("LOGOUT");
            store.dispatch("CLEAR_HEADER_ROUTER");
            localStorage.removeItem("vuex");
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            router.replace("/login");
            ElMessage.success("退出成功");
          })
          .catch(() => {
            ElMessage.info("取消退出");
          });
      }
    };

    // 关闭用户账号信息弹层
    const closeAccountDialog = () => {
      accountFrom.value.resetFields();
    };

    // 图片上传之前
    const beforeUpload = (file) => {
      const type = file.type?.split("/")[1]?.toLowerCase() || "";
      const isPic = ["jpeg", "png", "gif", "jpg", "webp", "svg"];
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isPic.includes(type)) {
        ElMessage.error("上传图片只能是 " + isPic + " 格式!");
      }
      if (!isLt3M) {
        ElMessage.error("上传头像图片大小不能超过 3MB!");
      }
      return isPic && isLt3M;
    };

    // 上传图片
    const uploadImg = async (item) => {
      let formData = new FormData();
      formData.append("image", item.file);
      const res: any = await axios({
        method: "post",
        url: "http://127.0.0.1:3000/api/user/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (res.data.code === "0000000") {
        state.accountInfo.avatar = res.data.filename;
      } else {
        ElMessage.error("上传失败");
      }
    };

    // 提交修改用户信息
    const submitAccountForm = () => {
      const from = unref(accountFrom);
      if (!from) return;
      from.validate((valid: any) => {
        if (valid) {
          modifyUserApi({
            userId: state.accountInfo.userId,
            name: state.accountInfo.name,
            roleId: state.accountInfo.roleId,
            mobile: state.accountInfo.mobile,
            avatar: state.accountInfo.avatar,
            classId: state.accountInfo.classId,
            email: state.accountInfo.email,
          }).then((res: any) => {
            if (res.code === "0000000") {
              ElMessage.success("修改成功");
              // 当修改用户角色后
              if (state.accountInfo.roleId !== store.state.user.roleId) {
                getRoleAuthorityApi({ roleId: state.accountInfo.roleId }).then(
                  (ret: any) => {
                    if (ret.code === "0000000") {
                      let arr = [];
                      if (ret.data.length > 0) {
                        ret.data.forEach((item) => {
                          arr.push(item.authorityUrl);
                        });
                      }
                      store.commit("SET_ROLELIST", arr);
                      setTimeout(() => {
                        getRoutes(store);
                      });
                    }
                  }
                );
              }
              // 因为这里更新后其他涉及用户信息的页面都得变，这里统一跳回首页(也可以在其他页面监听当前用户信息改变进行刷新，不过太繁琐了，这里暂且不写)
              router.replace("/");
              store.commit("SET_NAME", state.accountInfo.name);
              store.commit("SET_ROLEID", state.accountInfo.roleId);
              store.commit("SET_MOBILE", state.accountInfo.mobile);
              store.commit("SET_AVATAR", state.accountInfo.avatar);
              store.commit("SET_CLASSID", state.accountInfo.classId);
              store.commit("SET_EMAIL", state.accountInfo.email);
              state.name = state.accountInfo.name;
              state.avatar = state.accountInfo.avatar;
              state.showChangeAccount = false;
            }
          });
        }
      });
    };

    // 打开修改密码弹层
    const openPassDialog = () => {
      oldPassword.value.focus();
    };

    // 关闭修改密码弹层
    const closePassDialog = () => {
      passFrom.value.resetFields();
    };

    // 提交修改密码信息
    const submitPassForm = () => {
      const from = unref(passFrom);
      if (!from) return;
      from.validate((valid: any) => {
        if (valid) {
          modifyPassApi({
            userId: store.state.user.userId,
            oldpassword: md5(state.passInfo.oldPassword),
            password: md5(state.passInfo.newPassword),
          }).then((res: any) => {
            if (res.code === "0000000") {
              state.showChangePass = false;
              ElMessage.success("密码修改成功,请重新登录");
              store.dispatch("LOGOUT");
              store.dispatch("CLEAR_HEADER_ROUTER");
              localStorage.removeItem("vuex");
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
              router.replace("/login");
            }
          });
        }
      });
    };

    // 面包屑一级点击
    const mainMenuRouterClick = () => {
      // 设置面包屑二级菜单为空
      store.commit("SET_SUB_MENU_ROUTER", { title: "", path: "" });
    };

    // 监听展开缩进变量，及时更新，让图标正确显示
    watch(
      () => store.state.system.isCollapse,
      (val) => {
        state.isCollapse = val;
      }
    );

    // 监听当前用户名称
    watch(
      () => store.state.user.name,
      (val) => {
        state.name = val;
      }
    );

    // 监听当前用户头像
    watch(
      () => store.state.user.avatar,
      (val) => {
        state.avatar = val;
      }
    );

    return {
      ...toRefs(state),
      passFrom,
      oldPassword,
      accountFrom,
      toggleCollapse,
      handleCommand,
      closeAccountDialog,
      beforeUpload,
      uploadImg,
      submitAccountForm,
      openPassDialog,
      closePassDialog,
      submitPassForm,
      mainMenuRouterClick,
      showCom
    };
  },
});
</script>
<style lang="scss">
li.el-dropdown-menu__item {
  line-height: 20px;
  padding: 6px 36px !important;
  white-space: nowrap;
  &:hover {
    background-color: #f9fafb !important;
    color: #4091fd !important;
  }
}
</style>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  user-select: none;
  height: 64px;
  line-height: 64px;
  background-color: #fff;
  margin-left: 0.5px;
  .left {
    padding-left: 16px;
    min-width: 200px;
    text-align: left;
    svg {
      width: 30px;
      height: 30px;
      cursor: pointer;
      margin-right: 16px;
      vertical-align: middle;
    }
    .el-breadcrumb {
      display: inline-block;
      vertical-align: middle;
      :deep(.el-breadcrumb__inner) {
        a {
          font-size: 14px;
          color: #999;
          font-weight: 400;
          cursor: pointer;
        }
      }
      :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
        a {
          color: #333;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    min-width: 143px;
    padding-right: 13px;
    justify-content: center;
    .lingdang {
      line-height: 30px;
      margin-right: 40px;
      svg {
        width: 30px;
        height: 30px;
        color: #333;
        cursor: pointer;
        vertical-align: bottom;
        &:hover {
          color: #5ba7da;
        }
        &:active {
          color: #007acc;
        }
      }
      :deep(.el-badge__content) {
        cursor: pointer;
        top: 5px;
        right: 15px;
      }
    }
    .el-dropdown {
      .el-dropdown-link {
        display: flex;
        align-items: center;
        .username {
          margin-left: 10px;
          display: inline-block;
          font-size: 14px;
          font-weight: 400;
          color: #333;
          user-select: none;
        }
      }
    }
  }
}
.password-dialog,
.account-dialog {
  :deep(.el-dialog) {
    min-width: 480px;
    max-width: 680px;
    .el-dialog__header {
      text-align: left;
      padding: 16px 24px;
      border-bottom: 1px solid #e4e9f1;
      background-color: rgba(64, 145, 253, 0.05);
      .el-dialog__title {
        height: 28px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        color: #333333;
        line-height: 28px;
      }
      .el-dialog__close {
        font-size: 18px;
        color: #333333;
      }
    }
    .el-dialog__body {
      padding: 32px 100px 32px;
      max-height: 344px;
      overflow: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e4e9f1;
      padding: 12px 24px;
      button {
        margin-left: 8px;
        padding-left: 19px;
        padding-right: 19px;
      }
    }
  }
}
.account-dialog {
  :deep(.el-dialog) {
    min-width: 680px;
    .el-dialog__body {
      padding: 12px 32px !important;
      max-height: 380px !important;
      overflow: auto;
      .el-form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-form-item {
          width: 272px;
          min-height: 62px;
          height: 100%;
          flex-direction: column;
          margin-bottom: 10px;
          margin-top: 4px;
          .el-form-item__label {
            text-align: left;
            line-height: 22px;
          }
          .el-form-item__content {
            .el-form-item__error {
              margin-top: 4px;
              position: inherit;
            }
          }
          .myavatar {
            margin-top: 8px;
            .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              &:hover {
                border-color: #58595a;
              }
              .fa-plus {
                font-size: 28px;
                color: #8c939d;
                width: 120px;
                height: 120px;
                line-height: 120px;
                text-align: center;
              }
              .avatar {
                width: 120px;
                height: 120px;
                display: block;
              }
            }
          }
          .el-select {
            width: 272px;
            .el-icon-circle-close {
              &::before {
                color: #ff4d4f;
              }
            }
            .el-input__suffix {
              .el-select__caret {
                height: 32px;
              }
            }
            .el-icon-arrow-up {
              height: 28px;
            }
          }
          .el-icon-circle-check {
            line-height: 32px;
            &.el-input__validateIcon {
              display: none;
            }
          }
          .el-icon-circle-close {
            line-height: 32px;
            &.el-input__validateIcon {
              display: none;
            }
          }
        }
      }
    }
  }
}
.message-list {
  :deep(.el-drawer.rtl.open) {
    min-width: 320px;
    .el-drawer__header {
      padding: 20px;
      margin: 0;
      border-bottom: 1px solid rgb(224, 223, 223);
      div.title {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 18px;
          color: #333;
        }
      }
    }
    .el-drawer__body {
      padding: 0;
      overflow: hidden;
      .list {
        height: calc(100% - 52px);
        li {
          padding: 10px 20px;
          cursor: pointer;
          &:hover {
            background-color: rgb(233, 229, 229);
          }
        }
      }
      .footer {
        height: 52px;
        padding: 14px 20px 15px;
        line-height: 22px;
        display: flex;
        justify-content: space-between;
        color: #333;
        border-top: 1px solid rgb(224, 223, 223);
        span {
          opacity: 0.8;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
