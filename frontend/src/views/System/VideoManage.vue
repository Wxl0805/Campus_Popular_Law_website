<template>
  <div class="user-manage">
    <ZyTable
      ref="zytab"
      rowKey="id"
      :showOperArea="true"
      :showCheckbox="true"
      :operWidth="160"
      operFixed="right"
      :showOrder="false"
      :showbatchDelete="true"
      :headerCellStyle="{ 'background-color': '#F2F2F2', height: '54px', padding: '0', color: '#111'}"
      :cellStyle="{ height: '54px', padding: '0', color: '#666' }"
      :tableData="videoTable"
      :columnGroup="tabShowList"
      :changeStyleList="changeStyleList"
      :pageInfo="pageInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      @handleSearch="handleSearch"
      @batchDeleteClicked="batchDeleteClicked"
      @createClicked="createClicked"
      @expandChange="expandChange"
      >
      <template v-slot:videoTitleImg="slotProps">
        <div style="width:100%;height: 100%;display: flex;align-items: center;">
          <el-image
            style="width: 50px;height: 50px;"
            :src="slotProps.item.videoTitleImg || require('@/assets/no_picture.gif')"
            fit="cover"
          />
        </div>
      </template>
      <template v-slot:oper="slotProps">
        <span class="oper">
          <i
            class="oper-icon edit-icon fa-pencil-square-o"
            @click="modifyClicked(slotProps.item)"
          ></i>
          <i
            class="oper-icon del-icon fa-trash-o"
            @click="deleteClicked(slotProps.item)"
          ></i>
        </span>
      </template>
    </ZyTable>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import ZyTable from "@/components/ZYTable.vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {useRoute, useRouter} from "vue-router";

import {
  queryVideoApi,
  delVideoApi,
} from "@/api/modules/video";
export default defineComponent({
  components: { ZyTable, Plus },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      // 表格展示的数据
      videoTable: [],
      // 表格展示列
      tabShowList: [
        {
          prop: "title",
          name: "标题",
          fixed: "left",
        },
        {
          prop: "author",
          name: "作者",
          fixed: "left",
        },
        {
          prop: "videoTitleImg",
          name: "标题图片",
          fixed: "left",
        },
        {
          prop: "time",
          name: "时间",
          fixed: "left",
        },
      ],
      // 需要使用插槽的列
      changeStyleList: ["videoTitleImg"],
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
        name: "",
      },
      // 展开的行的key
      expandRowKeys: [],
    });
    // 表格ref
    const zytab = ref(null);

    // 渲染数据
    const renderTabData = async () => {
      const res: any = await queryVideoApi({
        pageNo: state.pageInfo.currentPage,
        pageSize: state.pageInfo.pageSize,
        searchInfo: state.searchInfo.name,
      });
      if (res.code === "0000000") {
        state.videoTable.length = 0;
        res.data.dataList.forEach((item) => {
          state.videoTable.push({
            videoId: item.videoId,
            title: item.title,
            author: item.author,
            videoTitleImg: item.videoTitleImg,
            time: item.time,
          });
        }),
        state.pageInfo.currentPage = res.data.pageNo;
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
        state.searchInfo.name = searchInfo;
      }
      state.pageInfo.currentPage = 1;
      renderTabData();
    };

    // 添加
    const createClicked = () => {
      router.push({path: '/addVideo'})
    };

    // 修改
    const modifyClicked = (item: any) => {
      router.push({path: '/editVideo', query: {videoId: item.videoId}});
    };

    // 删除
    const deleteClicked = (item: any) => {
      ElMessageBox.confirm("你确定要删除该视频?", "删除视频", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          delVideoApi({ ids: [item.videoId] }).then((res: any) => {
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
          return err;
        });
    };

    // 批量删除
    const batchDeleteClicked = (selection) => {
      if (selection.length === 0) {
        ElMessage.warning("至少选择一条数据");
        return;
      }
      let ids = [];
      selection.forEach((item: any) => {
        ids.push(item.videoId);
      });
      ElMessageBox.confirm("你确定要删除所选视频?", "批量删除视频", {
        confirmButtonText: "确 定",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          delVideoApi({ ids: ids }).then((res: any) => {
            if (res.code == 0) {
              ElMessage.success("删除成功");
              if (
                state.pageInfo.total % state.pageInfo.pageSize == ids.length &&
                state.pageInfo.currentPage !== 1
              ) {
                state.pageInfo.currentPage -= 1;
              }
              renderTabData();
            }
          });
        })
        .catch((err) => {
          return err;
        });
    };


    // 树形表格展开收缩触发
    const expandChange = (row: any, expanded: boolean) => {
      // 里面的id来源于表格组件中的rowKey,如为其他的，这也得更换
      if (expanded) {
        state.expandRowKeys.push(row.id);
      } else {
        let i = state.expandRowKeys.indexOf(row.id);
        state.expandRowKeys.splice(i, 1);
      }
    };

    // 页面渲染初所有接口调用
    const apis = async () => {
      await renderTabData();
    };
    apis();

    return {
      ...toRefs(state),
      zytab,
      currentChange,
      sizeChange,
      handleSearch,
      createClicked,
      modifyClicked,
      deleteClicked,
      batchDeleteClicked,
      expandChange,
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