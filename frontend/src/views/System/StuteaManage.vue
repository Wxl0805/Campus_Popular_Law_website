<template>
  <div class="user-manage">
    <ZyTable
      ref="zytab"
      rowKey="userId"
      :showOperArea="true"
      :showCheckbox="false"
      :operWidth="160"
      operFixed="right"
      :showOrder="false"
      :headerCellStyle="{ 'background-color': '#F2F2F2', height: '54px', padding: '0', color: '#111'}"
      :cellStyle="{ height: '54px', padding: '0', color: '#666' }"
      :tableData="userTable"
      :columnGroup="tabShowList"
      :changeStyleList="changeStyleList"
      :pageInfo="pageInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      @handleSearch="handleSearch"
      @createClicked="createClicked"
      @expandChange="expandChange"
      >
      <!-- 批量删除（不用） -->
      <!-- @batchDeleteClicked="batchDeleteClicked" -->
      <template v-slot:filter>
        <div class="search">
          <el-select
            class="status"
            size="small"
            v-model="searchInfo.status"
            placeholder="用户状态"
            @change="handleSearch(null)"
            clearable
          >
            <el-option
              label="激活"
              :value="1"
            ></el-option>
            <el-option
              label="禁用"
              :value="2"
            ></el-option>
          </el-select>
        </div>
      </template>
      <template v-slot:status="slotProps">
        <el-switch
          :model-value="slotProps.item.status"
          active-color="#13ce66"
          :active-value="1"
          active-text="激活"
          :inactive-value="2"
          inactive-text="禁用"
          @change="statusChange($event,slotProps.item.userId)"
        >
        </el-switch>
      </template>
      <template v-slot:oper="slotProps">
        <span class="oper">
          <i
            class="oper-icon edit-icon fa-pencil-square-o"
            @click="modifyClicked(slotProps.item)"
          ></i>
          <!-- 删除按钮（不用） -->
          <!-- <i
            class="oper-icon del-icon fa-trash-o"
            @click="deleteClicked(slotProps.item)"
          ></i> -->
          <i
            class="resetpass"
            @click="resetPass(slotProps.item)"
          >重置密码</i>
        </span>
      </template>
    </ZyTable>
  </div>
  <div class="user-dialog">
    <el-dialog
      :title="isAdd?'新建用户':'修改用户'"
      v-model="showUserDialog"
      :close-on-click-modal="false"
      @closed="closeDialog"
      top="50px"
    >
      <el-form
        ref="ruleForm"
        status-icon
        :rules="rules"
        :model="userForm"
      >
        <el-form-item
          label="身份证号："
          prop="userId"
        >
          <el-input
            size="small"
            placeholder="请输入身份证号"
            v-model.sync.trim="userForm.userId"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名："
          prop="userName"
        >
          <el-input
            size="small"
            placeholder="请输入用户姓名"
            v-model.trim="userForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="isAdd"
          label="密码："
          prop="password"
        >
          <el-input
            size="small"
            placeholder="请输入密码"
            v-model.trim="userForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="isAdd"
          label="确认密码："
          prop="checkPassword"
        >
          <el-input
            size="small"
            placeholder="请再次确认密码："
            v-model.trim="userForm.checkPassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话："
          prop="phone"
        >
          <el-input
            size="small"
            placeholder="请输入联系电话"
            v-model.trim="userForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input
            size="small"
            placeholder="请输入邮箱"
            v-model="userForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="班级管理："
          prop="classId"
        >
          <el-select
            size="small"
            v-model="userForm.classId"
            placeholder="请选择班级"
            filterable
          >
            <el-option
              v-for="item in AlldeptOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="角色："
          prop="identity"
        >
          <el-select
            size="small"
            v-model="userForm.identity"
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
        <el-form-item
          label="激活："
          v-if="isAdd"
        >
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="showUserDialog=false"
          >取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="submitUserFrom"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs, unref } from "vue";
import ZyTable from "@/components/ZYTable.vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import md5 from "js-md5";
import {
  validatePass,
  validatePhone,
  validateEmail,
  validateIdcard,
} from "@/utils/validateFunction";
import {
  getAllUserApi,
  queryUserApi,
  createUserApi,
  modifyUserApi,
  modifyPassApi,
  modifyStatusApi,
  queryClass
} from "@/api/modules/stuteacher";
import { getName } from "@/utils/toolFunction";
import { getRoutes } from "@/router";
import axios from "axios";
import moment from "moment";
export default defineComponent({
  components: { ZyTable, Plus },
  setup() {
    // 确认密码验证
    const validateCheckPass = (rule: any, value: any, callback: Function) => {
      if (value !== state.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
        state.userForm.checkPassword = "";
      } else {
        callback();
      }
    };
    const state = reactive({
      // 表格展示的数据
      userTable: [],
      // 表格展示列
      tabShowList: [
        {
          prop: "userId",
          name: "身份证号",
          fixed: "left",
        },
        {
          prop: "userName",
          name: "姓名",
          fixed: "left",
        },
        {
          prop: "className",
          name: "班级",
          fixed: "left",
        },
        {
          prop: "identity",
          name: "角色",
        },
        {
          prop: "phone",
          name: "联系电话",
        },
        {
          prop: "email",
          name: "邮箱",
        },
        {
          prop: "status",
          name: "状态",
          width: 140,
        },
      ],
      // 需要使用插槽的列
      changeStyleList: ["status"],
      // 页面数据
      pageInfo: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        name: null,
      },
      // 搜索信息
      searchInfo: {
        // userId: null,
        userName: "",
        // className: "",
        status: null,
      },
      aditionalInfo: {
        roleId: JSON.parse(localStorage.getItem('vuex')).user.roleId,
        classId: JSON.parse(localStorage.getItem('vuex')).user.classId
      },
      // 展开的行的key
      expandRowKeys: [],
      // 是否打开添加或修改用户弹层
      showUserDialog: false,
      // 添加还是修改
      isAdd: true,
      // 用户信息表单
      userForm: {
        userId: null,
        userName: "",
        password: "",
        checkPassword: "",
        identity: null,
        phone: "",
        email: "",
        classId: null,
        status: 2,
      },
      // 班级选项
      deptOptions: [],
      // 所有
      AlldeptOptions: [],
      // 角色选项
      roleOptions: [
        {label: '教师', value: 0},
        {label: '学生', value: 1}
      ],
      // 用户表验证规则
      rules: {
        userId: [
          {required: true, validator: validateIdcard, trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validateCheckPass, trigger: "blur" },
        ],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        classId: [{ required: true, message: "请选择班级", trigger: "blur" }],
        identity: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
    });

    // 表格ref
    const zytab = ref(null);
    // 用户表单ref
    const ruleForm = ref(null);

    // 获取对应班级
    const getAllClasses = async () => {
      let classId = JSON.parse(localStorage.getItem('vuex')).user.classId;
      const res: any = await queryClass({classId});
      if (res.code === "0000000") {
        state.AlldeptOptions.length = 0;
        res.data.forEach((item: any) => {
          state.AlldeptOptions.push({
            value: item.classId,
            label: item.className,
          });
        });
      }
    };

    // 渲染数据
    const renderTabData = async () => {
      const res: any = await queryUserApi({
        pageNo: state.pageInfo.currentPage,
        pageSize: state.pageInfo.pageSize,
        searchInfo: state.searchInfo.userName,
        aditionalInfo: state.aditionalInfo,
        status: state.searchInfo.status,
      });
      if (res.code === "0000000") {
        state.userTable.length = 0;
        res.data.dataList.forEach((item) => {
          state.userTable.push({
            userId: item.userId,
            userName: item.userName,
            identity: item.identity == 1 ? '学生' : '教师',
            phone: item.phone,
            email: item.email,
            className: item.className,
            status: item.status ? item.status : null,
          });
        }),
          (state.pageInfo.currentPage = res.data.pageNo);
        state.pageInfo.pageSize = res.data.pageSize;
        state.pageInfo.total = res.data.total;
      }
    };

    // 当前页码改变
    const currentChange = (val: number) => {
      state.pageInfo.currentPage = val;
      renderTabData();
    };

    // 页面最多数量改变
    const sizeChange = (val: number) => {
      state.pageInfo.pageSize = val;
      renderTabData();
    };

    // 搜索
    const handleSearch = (searchInfo?: string) => {
      if (searchInfo === null) {
        // 当切换状态搜索时
        zytab.value.clearCheckboxs();
      }
      if (searchInfo !== null) {
        state.searchInfo.userName = searchInfo;
      }
      state.pageInfo.currentPage = 1;
      renderTabData();
    };

    // 添加
    const createClicked = () => {
      state.showUserDialog = true;
      state.isAdd = true;
    };

    // 修改
    let olduserId = ref('');
    let oldclassName = ref('');
    const modifyClicked = (item: any) => {
      state.showUserDialog = true;
      state.isAdd = false;
      nextTick(() => {
        state.userForm.userId = item.userId;
        state.userForm.userName = item.userName;
        state.userForm.identity = item.identity;
        state.userForm.phone = item.phone;
        state.userForm.email = item.email;
        state.userForm.status = item.status;
        oldclassName.value = item.className;
        olduserId.value = item.userId;
      });
    };

    // 重置密码
    const resetPass = (item: any) => {
      ElMessageBox.confirm("你确定要重置该用户密码?", "重置密码", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          modifyPassApi({ userId: item.userId }).then((res: any) => {
            if (res.code == 0) {
              ElMessage.success("密码已重置");
              renderTabData();
            }
          });
        })
        .catch((err) => {
          return err;
        });
    };

    // 修改用户状态switch
    const statusChange = (status: number, userId: number) => {
      if (!userId) return;
      modifyStatusApi({
        userId: userId,
      }).then((res: any) => {
        if (res.code == 0) {
          ElMessage.success("状态修改成功");
          renderTabData();
        }
      });
    };

    // 树形表格展开收缩触发
    const expandChange = (row: any, expanded: boolean) => {
      // 里面的id来源于表格组件中的rowKey,如为其他的，这也得更换
      if (expanded) {
        state.expandRowKeys.push(row.userId);
      } else {
        let i = state.expandRowKeys.indexOf(row.userId);
        state.expandRowKeys.splice(i, 1);
      }
    };

    // 提交用户表单
    const submitUserFrom = () => {
      const form = unref(ruleForm);
      if (!form) return;
      // 先对登录表单进行验证
      form.validate((valid: any) => {
        if (valid) {
          // 添加时提交
          if (state.isAdd) {
            createUserApi({
              userId: state.userForm.userId,
              userName: state.userForm.userName,
              password: md5(state.userForm.password + md5(state.userForm.password).split(10, 10)),
              identity: state.userForm.identity,
              phone: state.userForm.phone,
              classId: state.userForm.classId,
              email: state.userForm.email,
              status: state.userForm.status,
            }).then((res: any) => {
              if (res.code == 0) {
                ElMessage.success("新建成功");
                state.showUserDialog = false;
                state.pageInfo.currentPage = 1;
                renderTabData();
              }
            });
          } else {
            // 修改时提交
            modifyUserApi({
              userId: state.userForm.userId,
              userName: state.userForm.userName,
              identity: state.userForm.identity,
              phone: state.userForm.phone,
              classId: state.userForm.classId,
              email: state.userForm.email,
              oldclassName: oldclassName.value
              olduserId: olduserId.value
            }).then((res: any) => {
              if (res.code == 0) {
                ElMessage.success("修改成功");
                state.showUserDialog = false;
                renderTabData();
              }
            });
          }
        }
      });
    };

    // 关闭用户弹层
    const closeDialog = () => {
      state.userForm.userId = null;
      state.userForm.status = 2;
      ruleForm.value.resetFields();
    };

    // 页面渲染初所有接口调用
    const apis = async () => {
      await getAllClasses();
      await renderTabData();
    };
    apis();

    return {
      ...toRefs(state),
      zytab,
      ruleForm,
      currentChange,
      sizeChange,
      handleSearch,
      createClicked,
      modifyClicked,
      resetPass,
      statusChange,
      expandChange,
      submitUserFrom,
      closeDialog,
    };
  },
});
</script>

<style scoped lang='scss'>
.user-manage {
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  // *******************************父容器必备属性**********************************
  min-width: 680px; // 没有它表格上面那部分屏幕变窄会挤在一起,数据自己根据搜索条件的多少调节
  overflow: auto; // 没有它会溢出
  // *******************************父容器必备属性**********************************
  background-color: #fff;
  .search {
    display: flex;
    :deep(.el-select) {
      width: 130px;
    }
  }
  .oper {
    .oper-icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      background-size: 100% 100%;
      cursor: pointer;
      font-size: 18px;
      margin-right: 16px;
      &.edit-icon {
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
      &.del-icon {
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
    }
    .resetpass {
      font-style: normal;
      line-height: 18px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
}
.user-dialog {
  :deep(.el-dialog) {
    width: 680px;
    .el-dialog__header {
      padding: 0;
      height: 56px;
      background: rgba(64, 145, 253, 0.05);
      border-top: 1px solid transparent;
      .el-dialog__title {
        display: inline-block;
        margin-top: 14px;
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
    .el-dialog__body {
      padding: 12px 32px;
      max-height: 380px;
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
    .el-dialog__footer {
      border-top: 1px solid #e8e8e8;
      height: 56px;
      padding-top: 12px;
      padding-right: 24px;
      padding-bottom: 12px;
      .el-button {
        width: 65px;
        height: 32px;
      }
    }
  }
}
</style>