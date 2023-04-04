<!--
 * @Author: [you name]
 * @Date: 2021-12-06 17:47:30
 * @LastEditors: [you name]
 * @LastEditTime: 2021-12-06 17:47:30
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-admin\src\views\System\NoticeSetting.vue
-->
<template>
  <div class="notification-settings">
    <div class="system-email">
      <span>系统发件邮箱设置：</span>
      <el-input
        size="small"
        v-model="systemEmail"
      />
    </div>
    <div class="settings">
      <div class="defect-setting">
        <span>缺陷管理</span>
        <el-table
          :data="defectSettings"
          :header-cell-style="{
            'background-color': '#FAFAFA',
            height: '56px',
            padding: '0',
            color: '#333'
          }"
          :cell-style="{ height: '48px', padding: '0', color: '#333' }"
        >
          <el-table-column
            prop="changeItem"
            label="工作项变更"
            :min-width="400"
          ></el-table-column>
          <el-table-column
            v-for="prop in tabShowList"
            :key="prop.prop"
            :prop="prop.prop"
            :label="prop.name"
            :width="prop.width || 110"
            :align="prop?.align || 'center'"
            :show-overflow-tooltip="true"
          >
            <template #default="scope">
              <el-checkbox v-model="scope.row[prop.prop]"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="buttons">
        <el-button size="small">取消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="saveSetting"
        >保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      systemEmail: "ptcentermsg@zrcctv.com",
      defectSettings: [
        {
          changeItem: "当缺陷状态变更时，会通知到",
          sysNotific: false,
          emailNotific: false,
          currentHandler: false,
          solver: false,
          ccOrCreator: false,
          approver: false,
        },
        {
          changeItem: "缺陷状态关闭时，会通知到",
          sysNotific: false,
          emailNotific: false,
          currentHandler: false,
          solver: false,
          ccOrCreator: false,
          approver: false,
        },
        {
          changeItem: "当缺陷状态挂起审批时，会通知到",
          sysNotific: false,
          emailNotific: false,
          currentHandler: false,
          solver: false,
          ccOrCreator: false,
          approver: false,
        },
        {
          changeItem: "当缺陷状态挂起审批不通过时，会通知到",
          sysNotific: false,
          emailNotific: false,
          currentHandler: false,
          solver: false,
          ccOrCreator: false,
          approver: false,
        },
        {
          changeItem: "优先级为“高”的缺陷未关闭时，会每日8：00通知到",
          sysNotific: false,
          emailNotific: false,
          currentHandler: false,
          solver: false,
          ccOrCreator: false,
          approver: false,
        },
        {
          changeItem: "优先级为“中”的缺陷超过3天未关闭时，会每日8：00通知到",
          sysNotific: false,
          emailNotific: false,
          currentHandler: false,
          solver: false,
          ccOrCreator: false,
          approver: false,
        },
        {
          changeItem: "优先级为“低”的缺陷超过5天未关闭时，会每日8：00通知到",
          sysNotific: false,
          emailNotific: false,
          currentHandler: false,
          solver: false,
          ccOrCreator: false,
          approver: false,
        },
      ],
      tabShowList: [
        {
          prop: "sysNotific",
          name: "系统通知",
        },
        {
          prop: "emailNotific",
          name: "邮件通知",
        },
        {
          prop: "currentHandler",
          name: "当前处理人",
        },
        {
          prop: "solver",
          name: "解决人",
        },
        {
          prop: "ccOrCreator",
          name: "抄送/创建人",
        },
        {
          prop: "approver",
          name: "审批人",
        },
      ],
    });

    const saveSetting = () => {
      console.log(state.defectSettings);
    };

    return {
      ...toRefs(state),
      saveSetting,
    };
  },
});
</script>
<style lang="scss" scoped>
.notification-settings {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .system-email {
    height: 72px;
    background-color: #fff;
    border-radius: 9px;
    padding: 20px 45px;
    span {
      font-size: 14px;
      color: #333;
      line-height: 20px;
    }
    .el-input {
      width: 200px;
    }
  }
  .settings {
    margin-top: 8px;
    height: calc(100% - 80px);
    background-color: #fff;
    border-radius: 9px;
    padding: 32px 45px;
    .defect-setting {
      span {
        color: #333;
        line-height: 22px;
      }
      :deep(.el-table) {
        margin-top: 8px;
        .el-table__body-wrapper {
          &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          &::-webkit-scrollbar-track {
            background-color: transparent;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #ccc;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
        }
        tr {
          th:nth-child(3),
          td:nth-child(3) {
            border-right: 1px solid rgba($color: #e8e8e8, $alpha: 0.36);
          }
        }
      }
    }
    .buttons {
      padding: 16px 0;
      text-align: right;
    }
  }
}
</style>