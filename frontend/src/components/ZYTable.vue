<template>
  <div class="tab" ref="tab">
    <div class="oper-area" v-if="showOperArea" ref="operArea">
      <el-input
        size="small"
        v-model.trim="searchInfo"
        @keydown.enter.stop="handleSearch"
        placeholder="请输入搜索关键字（按Enter搜索）"
      >
        <template #prefix>
          <el-icon @click="handleSearch"><search /></el-icon>
        </template>
      </el-input>
      <!-- 留出插槽共更多筛选 -->
      <div class="filter">
        <slot name="filter"></slot>
      </div>
      <el-button size="small" type="danger" @click="batchDeleteClicked">批量删除</el-button>
      <el-button size="small" type="primary" @click="createClicked">
        <i class="fa-plus"></i> 新 建
      </el-button>
    </div>
    <div class="show-tab">
      <!-- 表格 -->
      <el-table
        ref="table"
        class="table-class"
        :style="{'--height': bodyHeight}"
        :data="tableData"
        :height="tableHeight"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :indent="3"
        :row-key="rowKey"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
        @expand-change="expandChange"
      >
        <!-- 空数据时 -->
        <template #empty>
          <div class="empty"></div>
          <div class="title">暂无相关数据</div>
        </template>
        <!-- 序号 -->
        <el-table-column v-if="showOrder" type="index" :label="orderName" :width="orderWidth" :fixed="orderFixed"> </el-table-column>
        <!-- 多选 -->
        <el-table-column v-if="showCheckbox" type="selection" :width="checkboxWidth" :fixed="checkboxFixed"></el-table-column>
        <el-table-column
          v-for="prop in columnGroup"
          :key="prop.prop"
          :prop="prop.prop"
          :label="prop.name"
          :width="prop.width"
          :min-width="prop.minWidth"
          :fixed="prop.fixed"
          :align="prop?.align || 'left'" 
          :sortable="prop.sortable"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <slot v-if="changeStyleList?.includes(prop.prop)" :name="prop.prop" :item="scope?.row"> </slot>
            <slot v-else>{{scope.row[prop.prop]}}</slot>
          </template>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column :width="operWidth" v-if="showOper" :label="operName" :fixed="operFixed">
          <template #default="scope">
            <slot name="oper" :item="scope?.row"> </slot>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="footer" ref="footer" v-if="showPager">
        <el-pagination
          v-if="tableData.length > 0"
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          v-model:currentPage="pageInfo.currentPage"
          :page-sizes="pageInfo.pageSizes"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="pageInfo.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { Search, Plus } from '@element-plus/icons-vue'
export default defineComponent({
  components: { Search },
  props: {
    // 行数据的 Key
    rowKey: {
      type: String,
      default: 'id'
    },
    // 表格数据
    tableData: {
      type: Array,
      default: []  
    }, 
    // 列组
    columnGroup: Array,
    // 分页数据
    pageInfo: Object,
    // 需要使用插槽的列
    changeStyleList: Array,
    // 表头单元格样式
    headerCellStyle: {
      type: Object,
      default: { 'background-color': '#FAFAFA', height: '54px', padding: '0', color: '#333'}
    },
    // 单元格样式
    cellStyle: {
      type: Object,
      default: { height: '54px', padding: '0', color: '#333' }
    },
    // 展开子项的行的key
    expandRowKeys: {
      type: Array,
      default: [],
    },
    // 表格高度
    tableHeight: {
      type: Number,
      default: 360
    },
    // 序号列的展示名称
    orderName: {
      type:String,
      default: '序号'
    },
    // 操作列的展示名称
    operName: {
      type:String,
      default: '操作'
    },
    // 序号列宽度
    orderWidth: {
      type: Number,
      default: 60
    },
    // 复选框宽度
    checkboxWidth: {
      type: Number,
      default: 60
    },
    // 操作列宽度
    operWidth: {
      type: Number,
      default: 100
    },
    // 是否是树形表单（包含子级）
    hasChildren: {
      type: Boolean,
      default: false
    },
    // 是否自动伸缩表格高度
    autoSize: {
      type: Boolean,
      default: true
    },
    // 是否展示头部操作域
    showOperArea: {
      type: Boolean,
      default: false
    },
    // 是否展示序号
    showOrder: {
      type: Boolean,
      default: true
    },
    // 是否展示复选框
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 是否展示操作
    showOper: {
      type: Boolean,
      default: true
    },
    // 是否展示分页器
    showPager: {
      type: Boolean,
      default: true
    },
    // 序号栏是否固定
    orderFixed: {
      type: [Boolean, String],
      default: false
    },
    // 多选栏是否固定
    checkboxFixed: {
      type: [Boolean, String],
      default: false
    },
    // 操作栏是否固定
    operFixed: {
      type: [Boolean, String],
      default: false
    },
  },
  setup(props, context) {
    const state = reactive({
      // 分页信息对象
      pageInfo: props.pageInfo,
      // 设置列表的高度，用于适配屏幕高度
      tableHeight: props.tableHeight,
      // 判断是否已经最大化窗口
      fullTableFlag: false,
      // 展开子项的行的key
      expandRowKeys: props.expandRowKeys,
      // 搜索信息
      searchInfo: '',
      // 表格主体高度
      bodyHeight: '',
      // 多选选中的
      checkedList: [],
    });

    const tab = ref(null);
    const operArea = ref(null);
    const table = ref(null);
    const footer = ref(null);

    /**
     * @author: 吴志远
     * @todo: 分页器pageSize改变触发事件
     * @Date: 2021-11-18 10:53:40
     */    
    const sizeChange = (val: number)=> {
      context.emit("sizeChange", val);
    }

    /**
     * @author: 吴志远
     * @todo: 当前页码改变触发事件
     * @Date: 2021-11-18 10:54:40
     */ 
    const currentChange = (val: number)=> {
      clearCheckboxs();
      context.emit("currentChange", val);
    }

    /**
     * @author: 吴志远
     * @todo: 复选框的点击事件
     * @Date: 2021-11-18 10:55:40
     */ 
    const handleSelectionChange = (selection) => {
      state.checkedList = selection;
      // context.emit('handleSelectionChange', selection)
    }

    /**
     * @author: 吴志远
     * @todo: 清空复选框
     * @Date: 2021-11-18 10:56:40
     */ 
    const clearCheckboxs = () => {
      table.value.clearSelection();
    }

    /**
     * @author: 吴志远
     * @todo: 搜索
     * @Date: 2021-11-18 10:56:40
     */ 
    const handleSearch = () => {
      clearCheckboxs();
      context.emit('handleSearch', state.searchInfo)
    }

    /**
     * @author: 吴志远
     * @todo: 新建按钮点击事件
     * @Date: 2021-11-18 10:58:40
     */ 
    const createClicked = () => {
      context.emit("createClicked");
    };

    /**
     * @author: 吴志远
     * @todo: 批量删除按钮点击事件
     * @Date: 2021-11-18 11:02:40
     */ 
    const batchDeleteClicked = () => {
      context.emit("batchDeleteClicked", state.checkedList);
    };

    /**
     * @author: 吴志远
     * @todo: 属性表格子集展开或收缩时
     * @Date: 2021-11-18 11:02:40
     */ 
    const expandChange = (row, expanded)=> {
      context.emit("expandChange",row,expanded)
      getTableHeight();
    }

    /**
     * @author: 吴志远
     * @todo: 计算table高度的函数
     * @Date: 2021-11-18 12:26:06
     */    
    const getTableHeight = () => {
      if(props.autoSize) {
        // 先获取表格的最大高度
        if(!tab.value) {
          return;
        }
        let height = tab.value.clientHeight;
        if(props.showOperArea) {
          height = height - operArea.value.offsetHeight;
        }
        if(props.showPager) {
          height = height - footer.value.offsetHeight; 
        } 
        // 获取表格数据长度
        // @ts-ignore
        let tabDataLength:number = props.tableData.length;
        if(props.hasChildren) {
          // @ts-ignore
          props.tableData.forEach((item:any)=> {
            // @ts-ignore
            const flag = state.expandRowKeys ? state.expandRowKeys.some((it:any)=>{return it==item.demandNo}) : false
            if(flag && item.children){
              tabDataLength += item.children.length
            }
          })
        }
        // @ts-ignore
        if (tabDataLength * parseInt(props.cellStyle.height) + parseInt(props.headerCellStyle.height) > height) {
          // @ts-ignore
          state.tableHeight = height;
          state.fullTableFlag = true;
        } else {
          // @ts-ignore
          if(props.tableData && tabDataLength > 0) {
            // @ts-ignore
            state.tableHeight = tabDataLength * parseInt(props.cellStyle.height) + parseInt(props.headerCellStyle.height) + 1;
            state.fullTableFlag = false;
          }else {
            state.tableHeight = 360;
          }
        }
      }else {
        state.tableHeight = props.tableHeight;
      }
      // @ts-ignore
      // 固定列时表格主体的高度
      state.bodyHeight = state.tableHeight - parseInt(props.headerCellStyle.height) - 6 +'px';
    };

    watch(()=> props.tableData, ()=> {
        nextTick(()=>{ getTableHeight() })
      },{
        deep: true,
        immediate: true,
      }
    )

    // 输入框为空时自动搜索一次
    watch(()=>state.searchInfo, ()=>{
      if(state.searchInfo === '' || state.searchInfo === null) {
        handleSearch();
      }
    })

    onMounted(()=>{
      window.addEventListener('resize', getTableHeight)
    })
    onUnmounted(()=> {
      window.removeEventListener('resize', ()=>{
        return false;
      })
    })

 

    return {
      ...toRefs(state),
      tab,
      operArea,
      table,
      footer,
      sizeChange,
      currentChange,
      handleSelectionChange,
      clearCheckboxs,
      handleSearch,
      createClicked,
      batchDeleteClicked,
      getTableHeight,
      expandChange
    };
  },
});
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  height: 100%;
  background-color: #fff;
  flex-direction: column;
  .oper-area {
    display: flex;
    justify-content: space-between;
    min-height: 64px;
    align-items: center;
    >.el-input {
      width: 272px;
      margin-right: 20px;
      flex-shrink: 0;
      :deep(.el-input__prefix) {
        cursor: pointer;
        display: inline-block;
        padding-left: 6px;
        padding-top: 2px;
      }
    }
    .filter {
      flex: 1;
    }
    >.el-button {
      flex-shrink: 0;
      min-width: 80px;
    }
  }
  .show-tab {
    :deep(.table-class) {
      .el-table__fixed, .el-table__fixed-right {
        height: 100% !important;
        bottom: 0px !important;
        right: 0px !important;
        &::before {
          display: none;
        }
        .el-table__fixed-body-wrapper {
          height: var(--height) !important;
        }
      }
      .el-table__fixed-right-patch {
        width: 0 !important;
      }
    }
    :deep(.el-table) {
      width: 100%;
      .el-row {
        justify-content: space-between;
      }
      .cell.el-tooltip {
        color: #666666;
      }
      .el-table__header-wrapper {
        background-color: #fafafa;
        .el-table__header colgroup col[name="gutter"] {
        width: 6px !important;
        display: table-cell !important;
        }
        th>.cell {
          color: #333;
        }
      }
      .el-table__body-wrapper {
        .el-table__body {
          width: 100% !important;
        }
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
          background-color: transparent;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
        }
        &:hover {
          &::-webkit-scrollbar-thumb {
            background-color: #ccc;
          }
        }
      }
      .el-table-column--selection, .el-table__row .cell {
        .el-checkbox {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .el-table__empty-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .empty {
          width: 159px;
          height: 131px;
          background: url('~@/assets/empty.svg');;
          background-size: 100%;
        }
        .title {
          color: #999;
          font-size: 20px;
        }
      }
    }
    .footer {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
      :deep(.el-pagination) {
        height: 32px;
        .btn-prev, .btn-next {
          position: relative;
          background-color: #fff;
          border: 1px solid #D9D9D9;
          .el-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .number {
          border: 1px solid #D9D9D9;
        }
      }
    }
  }
}
</style>
