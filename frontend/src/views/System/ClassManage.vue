<template>
  <div class="class-manage">
    <div class="top">
      <div class="left">
        <span>全部班级</span>
        <el-input
          v-model="searchClassInfo"
          size="small"
          placeholder="请根据班级名称搜索（按Enter搜索）"
          @keydown.enter="searchClass"
        >
          <template #prefix>
            <el-icon @click="searchClass">
              <search />
            </el-icon>
          </template>
        </el-input>
      </div>
      <div class="right">
        <el-button
          size="small"
          type="primary"
          @click="createClicked"
        >
          <i class="fa-plus"> 新建班级</i>
        </el-button>
      </div>
    </div>
    <div class="bottom">
      <ZyTable
        :oper-width="120"
        oper-fixed="right"
        :show-order="false"
        :header-cell-style="{ 'background-color': '#F2F2F2', height: '54px', padding: '0', color: '#111'}"
        :cell-style="{ height: '54px', padding: '0', color: '#666' }"
        :table-data="classTable"
        :column-group="tabShowList"
        :change-style-list="changeStyleList"
        :page-info="pageInfo"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      >
        <template #oper="slotProps">
          <span class="oper">
            <i
              class="oper-icon edit-icon fa-pencil-square-o"
              @click="modifyClicked(slotProps.item)"
            />
            <!-- <i
              class="oper-icon del-icon fa-trash-o"
              @click="deleteClicked(slotProps.item)"
            /> -->
          </span>
        </template>
      </ZyTable>
    </div>
  </div>
  <div class="class-dialog">
    <el-dialog
      v-model="showClassDialog"
      :title="isAdd?'新建班级':'修改班级'"
      :close-on-click-modal="false"
      @closed="closeDialog"
    >
      <el-form
        ref="ruleForm"
        status-icon
        :rules="rules"
        :model="classForm"
      >
        <el-form-item
          label="班级名称："
          prop="className"
        >
          <el-input
            v-model.trim="classForm.className"
            size="small"
            placeholder="请输入班级名称"
          />
        </el-form-item>
        <!-- <el-form-item
          label="负责人："
          prop="director"
        >
          <el-select
            v-model="classForm.director"
            clearable
            size="small"
            placeholder="请选择负责人"
            filterable
          >
            <el-option
              v-for="item in directorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input
            v-model="classForm.email"
            size="small"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item
          label="班级描述："
          prop="classDesc"
          class="class-desc"
        >
          <el-input
            v-model="classForm.classDesc"
            clearable
            size="small"
            placeholder="请输入班级描述"
            type="textarea"
            :autosize="{minRows: 2}"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="showClassDialog=false"
          >取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="submitClassFrom"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  unref,
  reactive,
  ref,
  toRefs,
  watch,
  nextTick,
} from "vue";
import ZyTable from "@/components/ZYTable.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { validateEmail } from "@/utils/validateFunction";
import {
  queryClassApi,
  createClassApi,
  modifyClassApi,
  delClassApi,
} from "@/api/modules/class";
import { getAllUserApi } from "@/api/modules/user";
import { getName } from "@/utils/toolFunction";
import moment from "moment";
import { useStore } from "vuex";

export default defineComponent({
  components: { ZyTable, Search },
  setup() {
    const store = useStore();
    const state = reactive({
      // 表格展示的数据
      classTable: [],
      // 表格展示列
      tabShowList: [
        {
          prop: "className",
          name: "班级名称",
          fixed: "left",
        },
        {
          prop: "directorName",
          name: "负责人",
        },
        {
          prop: "email",
          name: "班级邮箱",
        },
        {
          prop: "classDesc",
          name: "班级描述",
        },
        {
          prop: "member",
          name: "总人数",
        },
        {
          prop: "stuNums",
          name: "学生人数",
        },
        {
          prop: "teacherNums",
          name: "教师人数",
        },
      ],
      // 需要使用插槽的列
      changeStyleList: [],
      // 页面数据
      pageInfo: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        name: null,
      },
      // 查询条件
      searchClassInfo: "",
      // 是否打开添加或修改用户弹层
      showClassDialog: false,
      // 添加还是修改
      isAdd: true,
      // 班级信息表单
      classForm: {
        classId: null,
        className: "",
        email: "",
        classDesc: "",
      },
      // 负责人选项
      directorOptions: [],
      // 用户表验证规则
      rules: {
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    });
    // 用户表单ref
    const ruleForm = ref(null);

    // 获取所有用户
    const getAllUsers = async () => {
      const res: any = await getAllUserApi();
      if (res.code == 0) {
        state.directorOptions.length = 0;
        res.data.forEach((item: any) => {
          state.directorOptions.push({
            value: item.userId,
            label: item.name,
          });
        });
      }
    };

    // 渲染数据
    const renderTabData = async () => {
      const res: any = await queryClassApi({
        pageNo: state.pageInfo.currentPage,
        pageSize: state.pageInfo.pageSize,
        className: state.searchClassInfo,
      });
      if (res.code == 0) {
        state.classTable.length = 0;
        res.data.dataList.forEach((item: any) => {
          state.classTable.push({
            classId: item.classId,
            className: item.className,
            director: item.director,
            directorName: getName(item.director, state.directorOptions),
            email: item.email,
            classDesc: item.classDesc,
            member: item.member,
            stuNums: item.stuNums,
            teacherNums: item.teacherNums,
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

    // 点击查询
    const searchClass = () => {
      state.pageInfo.currentPage = 1;
      renderTabData();
    };

    // 点击新建按钮
    const createClicked = () => {
      state.showClassDialog = true;
      state.isAdd = true;
    };

    // 点击修改按钮
    const modifyClicked = (item: any) => {
      state.showClassDialog = true;
      state.isAdd = false;
      nextTick(() => {
        state.classForm.classId = item.classId;
        state.classForm.className = item.className;
        state.classForm.email = item.email;
        state.classForm.classDesc = item.classDesc;
      });
    };

    // 点击删除按钮
    const deleteClicked = (item: any) => {
      ElMessageBox.confirm("你确定要删除该班级吗?", "删除班级", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          delClassApi({ ids: [item.classId] }).then((res: any) => {
            if (res.code == 0) {
              ElMessage.success("删除成功");
              if (
                state.pageInfo.total % state.pageInfo.pageSize == 1 &&
                state.pageInfo.currentPage !== 1
              ) {
                state.pageInfo.currentPage -= 1;
              }
              renderTabData();
            }
          });
        })
        .catch((err) => {
          return;
        });
    };

    // 提交用户表单
    const submitClassFrom = () => {
      const form = unref(ruleForm);
      if (!form) return;
      // 先对登录表单进行验证
      form.validate((valid: any) => {
        if (valid) {
          // 添加时提交
          if (state.isAdd) {
            createClassApi({
              className: state.classForm.className,
              email: state.classForm.email,
              classDesc: state.classForm.classDesc,
            }).then((res: any) => {
              if (res.code == 0) {
                ElMessage.success("新建成功");
                state.showClassDialog = false;
                state.pageInfo.currentPage = 1;
                renderTabData();
              }
            });
          } else {
            // 修改时提交
            modifyClassApi({
              classId: state.classForm.classId,
              className: state.classForm.className,
              email: state.classForm.email,
              classDesc: state.classForm.classDesc,
            }).then((res: any) => {
              if (res.code == 0) {
                ElMessage.success("修改成功");
                state.showClassDialog = false;
                renderTabData();
              }
            });
          }
        }
      });
    };

    // 关闭班级弹层
    const closeDialog = () => {
      state.classForm.classId = null;
      ruleForm.value.resetFields();
    };

    // 输入框为空时自动搜索一次
    watch(
      () => state.searchClassInfo,
      () => {
        if (state.searchClassInfo === "" || state.searchClassInfo === null) {
          searchClass();
        }
      }
    );

    // 页面渲染初所有接口调用
    const apis = async () => {
      await getAllUsers();
      await renderTabData();
    };
    apis();

    return {
      ...toRefs(state),
      ruleForm,
      currentChange,
      sizeChange,
      searchClass,
      createClicked,
      modifyClicked,
      deleteClicked,
      submitClassFrom,
      closeDialog,
    };
  },
});
</script>

<style scoped lang='scss'>
.class-manage {
  display: flex;
  min-width: 680px;
  flex-direction: column;
  height: 100%;
  padding: 20px 40px;
  background-color: #fff;
  .top {
    height: 64px;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    .left {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 14px;
      color: #333;
      > span {
        margin-right: 16px;
      }
      .el-input {
        width: 272px;
        height: 32px;
        :deep(.el-input__inner) {
          height: 32px;
          font-size: 14px;
        }
        :deep(.el-input__prefix) {
          cursor: pointer;
          display: inline-block;
          padding-left: 6px;
          padding-top: 4px;
        }
      }
    }
    .right {
      .el-button {
        margin-top: 16px;
        width: 120px;
        height: 32px;
        font-size: 14px;
        padding: 0;
      }
    }
  }
  .bottom {
    flex: 1;
    overflow: auto;
    .search {
      display: flex;
      .el-select {
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
    }
  }
}
.class-dialog {
  :deep(.el-dialog) {
    min-width: 680px;
    max-width: 680px;
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
        .class-desc {
          width: 100%;
          .el-form-item__label {
            padding-bottom: 4px;
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
