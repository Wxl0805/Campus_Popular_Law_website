<template>
  <div class="role-permissions">
    <!-- 角色部分 -->
    <div class="role-manage">
      <div class="title">
        <span>角色名称</span>
        <el-button
          type="primary"
          size="small"
          @click="createRole"
        ><i class="fa-plus"></i> 新建角色</el-button>
      </div>
      <div class="role-list">
        <el-scrollbar height="100%">
          <li
            v-for="item in roleList"
            :key="item.roleId"
            @click="clickItem(item)"
            :class="{'click-item':currentRoleId===item.roleId}"
          >
            <span class="name">
              <!-- <TextOverflow :content="item.roleName"></TextOverflow> -->
              {{item.roleName}}
            </span>
            <span class="oper">
              <i
                class="oper-icon modify-icon fa-pencil-square-o"
                @click.stop="modifyRole(item)"
              ></i>
              <i
                class="oper-icon delete-icon fa-trash-o"
                @click.stop="deleteRole(item)"
              ></i>
            </span>
          </li>
        </el-scrollbar>
      </div>
    </div>
    <!-- 权限部分 -->
    <div class="permissions">
      <div class="title">
        <span>
          <span>权限配置-当前角色：</span><span
            class="current-rolename">{{currentRoleName}}</span>
        </span>
        <el-button
          type="primary"
          size="small"
          @click="permissionSave"
        >保 存</el-button>
      </div>
      <div class="auhorities">
        <div class="treeHeader">
          <div class="left">页面权限</div>
          <div class="right">操作权限</div>
        </div>
        <div class="treeTableBox">
          <div class="treeTable">
            <div
              class="treeNode"
              v-for="node in roleTabList"
              :key="node.authorityUrl"
            >
              <div class="title first clearfix">
                <!-- 顶部（如：系统管理） -->
                <span class="titleHead">
                  <el-checkbox
                    v-model="node.isChecked"
                    :indeterminate="node.indeterminate"
                    @change="nodeChangeHandler(node, $event)"
                  >
                  </el-checkbox>
                  <span @click="node.isShow = !node.isShow">
                    <!-- <el-icon v-show="node.children && !node.isShow"><arrow-right-bold /></el-icon>
                    <el-icon v-show="node.children && node.isShow"><arrow-down-bold /></el-icon> -->
                    {{ node.authorityName }}
                  </span>
                </span>
              </div>
              <!-- 一级菜单的子菜单（如后台用户管理） -->
              <div
                class="treeNode"
                v-for="nodeSecound in node.children"
                :key="nodeSecound.authorityUrl"
                v-show="node.isShow"
              >
                <div class="title secound clearfix">
                  <span class="titleHead">
                    <el-checkbox
                      v-model="nodeSecound.isChecked"
                      :indeterminate="nodeSecound.indeterminate"
                      @change="nodeChangeHandler(nodeSecound, $event)"
                    >
                    </el-checkbox>
                    <span @click="nodeSecound.isShow = !nodeSecound.isShow">
                      <!-- <el-icon v-show="nodeSecound.children && !nodeSecound.isShow"><arrow-right-bold /></el-icon>
                      <el-icon v-show="nodeSecound.children && nodeSecound.isShow"><arrow-down-bold /></el-icon> -->
                      {{ nodeSecound.authorityName }}
                    </span>
                  </span>
                  <div
                    class="roleList"
                    v-if="nodeSecound.roles"
                    style="display: flex"
                  >
                    <div
                      class="role"
                      v-for="role in nodeSecound.roles"
                      :key="role.authorityUrl"
                    >
                      <el-checkbox
                        v-model="role.isChecked"
                        @change="roleChangeHandler(role, nodeSecound, $event)"
                      >
                      </el-checkbox>
                      {{ role.authorityName }}
                    </div>
                  </div>
                </div>
                <!-- 二级菜单的子菜单 -->
                <div
                  class="treeNode"
                  v-for="nodeThird in nodeSecound.children"
                  :key="nodeThird.authorityUrl"
                  v-show="nodeSecound.isShow"
                >
                  <div class="title third clearfix">
                    <span class="titleHead">
                      <el-checkbox
                        v-model="nodeThird.isChecked"
                        @change="nodeChangeHandler(nodeThird, $event)"
                        :indeterminate="nodeThird.indeterminate"
                      ></el-checkbox>
                      <span @click="nodeThird.isShow = !nodeThird.isShow">
                        <!-- <el-icon v-show="nodeThird.children && !nodeThird.isShow"><arrow-right-bold /></el-icon>
                        <el-icon v-show="nodeThird.children && nodeThird.isShow"><arrow-down-bold /></el-icon> -->
                        {{ nodeThird.authorityName }}
                      </span>
                    </span>
                    <div
                      class="roleList"
                      v-if="nodeThird.roles"
                      style="display: flex"
                    >
                      <div
                        class="role"
                        v-for="role in nodeThird.roles"
                        :key="role.authorityUrl"
                      >
                        <el-checkbox
                          v-model="role.isChecked"
                          @change="roleChangeHandler(role, nodeThird, $event)"
                        >
                        </el-checkbox>
                        {{ role.authorityName }}
                      </div>
                    </div>
                  </div>
                  <!-- 三级菜单的子菜单 -->
                  <div
                    class="treeNode"
                    v-for="nodeFourth in nodeThird.children"
                    :key="nodeFourth.authorityUrl"
                    v-show="nodeThird.isShow"
                  >
                    <div class="title fourth clearfix">
                      <span class="titleHead">
                        <el-checkbox
                          v-model="nodeFourth.isChecked"
                          @change="nodeChangeHandler(nodeFourth, $event)"
                          :indeterminate="nodeFourth.indeterminate"
                        >
                        </el-checkbox>
                        {{ nodeFourth.authorityName }}
                      </span>
                      <div
                        class="roleList"
                        v-if="nodeFourth.roles"
                        style="display: flex"
                      >
                        <div
                          class="role"
                          v-for="role in nodeFourth.roles"
                          :key="role.authorityUrl"
                        >
                          <el-checkbox
                            v-model="role.isChecked"
                            @change="roleChangeHandler(role, nodeFourth, $event)"
                          >
                          </el-checkbox>
                          {{ role.authorityName }}
                        </div>
                      </div>
                    </div>
                    <!-- 四级菜单的子菜单 -->
                    <div
                      class="treeNode"
                      v-for="nodefifth in nodeFourth.children"
                      :key="nodefifth.authorityUrl"
                      v-show="nodeFourth.isShow"
                    >
                      <div class="title fifth clearfix">
                        <span class="titleHead">
                          <el-checkbox
                            v-model="nodefifth.isChecked"
                            @change="nodeChangeHandler(nodefifth, $event)"
                            :indeterminate="nodefifth.indeterminate"
                          >
                          </el-checkbox>
                          {{ nodefifth.authorityName }}
                        </span>
                        <div
                          class="roleList"
                          v-if="nodefifth.roles"
                          style="display: flex"
                        >
                          <div
                            class="role"
                            v-for="role in nodefifth.roles"
                            :key="role.authorityUrl"
                          >
                            <el-checkbox
                              v-model="role.isChecked"
                              @change="roleChangeHandler(role, nodefifth, $event)"
                            >
                            </el-checkbox>
                            {{ role.authorityName }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="role-dialog">
    <el-dialog
      :width="330"
      :title="isAdd?'新建角色':'修改角色'"
      v-model="showDialog"
      :close-on-click-modal="false"
      @closed="handleClose"
    >
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="roleForm"
      >
        <el-form-item
          label="角色名称："
          prop="roleName"
        >
          <el-input
            size="small"
            placeholder="请输入角色名称"
            v-model.sync.trim="roleForm.roleName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述："
          prop="roleDesc"
        >
          <el-input
            v-model.sync.trim="roleForm.roleDesc"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="showDialog=false"
          >取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="submitFrom"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, toRefs, ref, unref } from "vue";
import TextOverflow from "@/components/TextOverflow.vue";
import router from "@/router";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getAllRoleApi,
  createRoleApi,
  modifyRoleApi,
  delRoleApi,
  getRoleAuthorityApi,
  modifyRoleAuthorityApi,
} from "@/api/modules/role";
import { getName } from "@/utils/toolFunction";
import { getRoutes } from "@/router";
import { useStore } from "vuex";
import { getAllRouter } from "@/permission/getUserRouter";
export default defineComponent({
  // components: {TextOverflow},
  setup() {
    const store = useStore();
    const state = reactive({
      // 角色列表
      roleList: [],
      currentRoleId: null,
      currentRoleName: null,
      showDialog: false,
      isAdd: true,
      roleForm: {
        roleId: null,
        roleName: null,
        roleDesc: null,
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { max: 20, message: "长度不能超过20个字符", trigger: "blur" },
        ],
        roleDesc: { max: 50, message: "长度不能超过50个字符", trigger: "blur" },
      },
      // 权限树表格数据
      roleTabList: [],
      // 拥有的权限
      roleCheckedList: [],
    });

    const ruleForm = ref(null);

    // 查询角色列表
    const queryRoleList = async () => {
      const res: any = await getAllRoleApi();
      if (res.code == 0) {
        state.roleList.length = 0;
        res.data.forEach((item: any) => {
          state.roleList.push({
            roleId: item.roleId,
            roleName: item.roleName,
            roleDesc: item.roleDesc,
          });
        });
      }
    };

    // 创建角色
    const createRole = () => {
      state.showDialog = true;
      state.isAdd = true;
    };

    // 选中角色
    const clickItem = (item: any) => {
      getAllCopyRouter();
      if (state.currentRoleId && state.currentRoleId === item.roleId) {
        state.currentRoleId = null;
        state.currentRoleName = null;
      } else {
        state.currentRoleId = item.roleId;
        state.currentRoleName = item.roleName;
        getRoleAuthorities();
      }
    };

    // 修改角色
    const modifyRole = (item: any) => {
      state.showDialog = true;
      state.isAdd = false;
      nextTick(() => {
        state.roleForm.roleId = item.roleId;
        state.roleForm.roleName = item.roleName;
        state.roleForm.roleDesc = item.roleDesc;
      });
    };

    // 删除角色
    const deleteRole = (item: any) => {
      ElMessageBox.confirm("此操作将永久删除该角色", "确认删除", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          // 调用删除接口
          delRoleApi({ ids: [item.roleId] }).then((res: any) => {
            if (res.code == 0) {
              ElMessage.success("删除成功");
              // 当删除的为当前所选的角色，清空当前所选
              if (item.roleId === state.currentRoleId) {
                state.currentRoleId = null;
                state.currentRoleName = null;
              }
              queryRoleList();
            }
          });
        })
        .catch((err) => {
          return err;
        });
    };

    // 关闭角色弹窗
    const handleClose = () => {
      ruleForm.value.resetFields();
    };

    // 提交角色表单
    const submitFrom = () => {
      const form = unref(ruleForm);
      if (!form) return;
      form.validate((valid: boolean) => {
        if (valid) {
          if (state.isAdd) {
            // 添加接口
            createRoleApi({
              roleName: state.roleForm.roleName,
              roleDesc: state.roleForm.roleDesc,
            }).then((res: any) => {
              if (res.code == 0) {
                ElMessage.success("添加成功");
                state.showDialog = false;
                queryRoleList();
              }
            });
          } else {
            // 修改接口
            modifyRoleApi({
              roleId: state.roleForm.roleId,
              roleName: state.roleForm.roleName,
              roleDesc: state.roleForm.roleDesc,
            }).then((res: any) => {
              if (res.code == 0) {
                ElMessage.success("修改成功");
                // 当修改的为当前所选的角色，重新渲染右边名称
                if (state.roleForm.roleId === state.currentRoleId) {
                  state.currentRoleName = state.roleForm.roleName;
                }
                state.showDialog = false;
                queryRoleList();
              }
            });
          }
        }
      });
    };

    // 获取所有权限路由
    const getAllCopyRouter = () => {
      state.roleTabList = getAllRouter();
    };

    // 渲染权限页面权限树节点
    const renderTableNode = (item: any) => {
      if (item.children && item.children.length > 0) {
        // 遍历孩子
        item.children.forEach((child) => {
          renderTableNode(child);
        });
      }
      // 渲染权限
      if (item.roles && item.roles.length > 0) {
        item.roles.forEach((role) => {
          const index = state.roleCheckedList.findIndex(
            (it) => it.authorityUrl === role.authorityUrl
          );
          role.isChecked = index !== -1 ? true : false;
        });
      }
      const roleArr =
        item.roles && item.roles.length > 0
          ? item.roles.filter((role) => role.isChecked === true)
          : [];
      const roleArrLength =
        item.roles && item.roles.length > 0 ? item.roles.length : 0;
      const childArr =
        item.children && item.children.length > 0
          ? item.children.filter(
              (child) =>
                child.isChecked === true || child.indeterminate === true
            )
          : [];
      const childArrLength =
        item.children && item.children.length > 0 ? item.children.length : 0;
      const checkedChildArr =
        item.children && item.children.length > 0
          ? item.children.filter((child) => child.isChecked === true)
          : [];
      if (roleArr.length + childArr.length === 0) {
        item.isChecked = false;
        item.indeterminate = false;
      } else if (
        roleArr.length + checkedChildArr.length ===
        childArrLength + roleArrLength
      ) {
        item.isChecked = true;
        item.indeterminate = false;
      } else {
        item.isChecked = false;
        item.indeterminate = true;
      }
    };

    // 权限保存
    const permissionSave = () => {
      if (!state.currentRoleId) {
        ElMessage.warning("请先选择角色");
        return;
      }
      let authorities = "";
      // 字符串拼接现有的选中的权限id
      if (state.roleCheckedList.length > 0) {
        state.roleCheckedList.forEach((item, index) => {
          if (index === state.roleCheckedList.length - 1) {
            authorities = authorities + item.authorityId;
          } else {
            authorities = authorities + item.authorityId + ",";
          }
        });
      }
      modifyRoleAuthorityApi({
        roleId: state.currentRoleId,
        authorities,
      }).then((res: any) => {
        if (res.code === "0000000") {
          ElMessage.success("权限修改成功");
          if (state.currentRoleId === store.state.user.roleId) {
            // 方法一：更新路由和权限（实用，比较官方,但也有一些问题，比如把当前页面的权限也退了，就会导致404或500）
            getRoleAuthorityApi({ roleId: store.state.user.roleId }).then(
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
            // 方法二：直接退出重新登陆（简单粗暴）
            // store.dispatch('LOGOUT');
            // store.dispatch('CLEAR_HEADER_ROUTER')
            // localStorage.removeItem("vuex");
            // localStorage.removeItem("token");
            // localStorage.removeItem("userName");
            // router.replace("/login");;
          } else {
            getRoleAuthorities();
          }
        }
      });
    };

    // 查询角色权限
    const getRoleAuthorities = async () => {
      const res: any = await getRoleAuthorityApi({
        roleId: state.currentRoleId,
      });
      if (res.code === "0000000") {
        state.roleCheckedList = res.data;
        state.roleTabList.forEach((item) => {
          renderTableNode(item);
        });
      }
    };

    // 页面选择框的点击事件
    const nodeChangeHandler = (node, bool) => {
      // 修改自身样式
      node.isChecked = bool;
      node.indeterminate = false;
      if (node.roles && node.roles.length > 0) {
        node.roles.forEach((role) => {
          bool ? roleCheckedListAddItem(role) : roleCheckedListDelItem(role);
        });
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          nodeChangeHandler(child, bool);
        });
      }
      // 重新渲染
      state.roleTabList.forEach((item) => {
        renderTableNode(item);
      });
    };

    // 权限选择框的点击事件
    const roleChangeHandler = (role, node, bool) => {
      // 修改自身样式
      role.isChecked = bool;
      role.indeterminate = false;
      // 往已经选中的权限中添加或删除
      bool ? roleCheckedListAddItem(role) : roleCheckedListDelItem(role);
      // 重新渲染
      state.roleTabList.forEach((item) => {
        renderTableNode(item);
      });
    };

    // 权限选中内容增加元素
    const roleCheckedListAddItem = (role) => {
      const index = state.roleCheckedList.findIndex((item) => {
        return item.authorityUrl === role.authorityUrl;
      });
      index === -1 ? state.roleCheckedList.push(role) : null;
    };

    // 权限选中内容删除元素
    const roleCheckedListDelItem = (role) => {
      // 删除权限数组中的内容
      const index = state.roleCheckedList.findIndex((item) => {
        return item.authorityUrl === role.authorityUrl;
      });
      index === -1 ? null : state.roleCheckedList.splice(index, 1);
    };

    queryRoleList();
    getAllCopyRouter();

    return {
      ...toRefs(state),
      ruleForm,
      createRole,
      clickItem,
      modifyRole,
      deleteRole,
      handleClose,
      submitFrom,
      permissionSave,
      nodeChangeHandler,
      roleChangeHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.role-permissions {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #ececec;
  .role-manage {
    width: 250px;
    flex-shrink: 0;
    margin-right: 8px;
    background-color: #fff;
    border-radius: 9px;
    .title {
      padding: 10px 16px;
      display: flex;
      border-bottom: 1px solid #ececec;
      justify-content: space-between;
      span {
        color: rgb(88, 88, 88);
        line-height: 32px;
      }
    }
    .role-list {
      height: calc(100% - 56px);
      padding-bottom: 10px;
      li {
        padding: 8px 16px;
        color: rgb(125, 125, 125);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ececec;
        .name {
          font-size: 14px;
          width: calc(100% - 52px);
        }
        .oper {
          visibility: hidden;
          width: 52px;
          padding-left: 4px;
          .oper-icon {
            display: inline-block;
            width: 18px;
            height: 18px;
            background-size: 100% 100%;
            cursor: pointer;
            font-size: 18px;
            &.modify-icon {
              opacity: 0.8;
              margin-right: 12px;
              &:hover {
                opacity: 1;
              }
            }
            &.delete-icon {
              opacity: 0.8;
              &:hover {
                opacity: 1;
              }
            }
          }
        }
        &:hover {
          background-color: #f4f4f4;
          .oper {
            visibility: visible;
          }
        }
        &.click-item {
          background-color: #e7e7e7;
          .name {
            color: #293038;
          }
          .oper {
            visibility: visible;
          }
        }
      }
    }
  }
  .permissions {
    flex: 1;
    min-width: 650px;
    overflow-x: auto;
    background-color: #fff;
    border-radius: 9px;
    padding: 10px 20px;
    .title {
      display: flex;
      justify-content: space-between;
      line-height: 32px;
      span {
        color: rgb(88, 88, 88);
        .current-rolename {
          color: rgb(67, 133, 255);
        }
      }
    }
    .auhorities {
      height: calc(100% - 56px);
      margin-top: 24px;
      .treeHeader {
        width: 100%;
        height: 50px;
        background-color: #fafafa;
        display: flex;
        color: #333;
        font-weight: 500;
        font-size: 14px;
        border: 1px solid #e8e8e8;
        border-bottom: transparent;
        text-align: center;
        .left {
          width: 300px;
          line-height: 50px;
        }
        .right {
          flex: 1;
          line-height: 50px;
        }
      }
      .treeTableBox {
        height: calc(100% - 50px);
        width: 100%;
        position: relative;
        border-bottom: 1px solid #e8e8e8;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &::before {
          position: absolute;
          top: 0;
          left: 300px;
          content: "";
          width: 1px;
          height: 100%;
          background-color: #e8e8e8;
        }
        .treeTable {
          height: 100%;
          overflow: auto;
          width: 100%;
          border: 1px solid #e8e8e8;
          border-bottom: transparent;
          position: relative;
          .treeNode {
            width: 100%;
            position: relative;
            .title {
              display: flex;
              border-bottom: 1px solid #e8e8e8;
              line-height: 32px;
              vertical-align: middle;
              &.first {
                min-height: 32px;
                .titleHead {
                  position: absolute;
                  top: 0;
                  left: 54px;
                  > span {
                    cursor: pointer;
                  }
                }
              }
              &.secound {
                min-height: 32px;
                .titleHead {
                  position: absolute;
                  top: 0;
                  left: 83px;
                  > span {
                    cursor: pointer;
                  }
                }
              }
              &.third {
                min-height: 32px;
                .titleHead {
                  position: absolute;
                  top: 0;
                  left: 103px;
                  > span {
                    cursor: pointer;
                  }
                }
              }
              &.fourth {
                min-height: 32px;
                .titleHead {
                  position: absolute;
                  top: 0;
                  left: 125px;
                  > span {
                    cursor: pointer;
                  }
                }
              }
              &.fifth {
                min-height: 32px;
                .titleHead {
                  position: absolute;
                  top: 0;
                  left: 147px;
                  > span {
                    cursor: pointer;
                  }
                }
              }
              .el-checkbox {
                margin-right: 8px;
                height: 32px;
              }
              .roleList {
                display: flex;
                flex-wrap: wrap;
                .role {
                  margin-left: 10px;
                  font-size: 14px;
                  color: #666;
                }
              }
            }
            .roleList {
              position: relative;
              width: calc(100% - 318px);
              top: 0;
              left: 318px;
            }
          }
        }
      }
    }
  }
}
.role-dialog {
  :deep(.el-dialog) {
    .el-dialog__header {
      padding: 0;
      height: 50px;
      background: rgba(64, 145, 253, 0.05);
      border-top: 1px solid transparent;
      .el-dialog__title {
        display: inline-block;
        margin-top: 16px;
        margin-left: 32px;
        font-weight: 500;
        color: #333;
        font-size: 16px;
      }
      .el-dialog__close {
        font-size: 18px;
        color: #333333;
      }
    }
    .el-dialog__footer {
      border-top: 1px solid #e8e8e8;
      height: 50px;
      padding-top: 9px;
      padding-right: 24px;
      padding-bottom: 9px;
      .el-button {
        width: 65px;
        height: 32px;
      }
    }
  }
}
</style>