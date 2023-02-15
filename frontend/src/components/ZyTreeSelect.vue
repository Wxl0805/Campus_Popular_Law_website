<template>
  <el-select
    ref="select"
    :model-value="value"
    placeholder="请选择上级组织"
    size="mini"
    clearable
    style="width: 100%"
    @clear="clear"
  >
    <el-option
      ref="option"
      class="option"
      :value="id"
      :label="name"
    >
      <el-tree
        ref="tree"
        class="tree"
        :node-key="nodeKey"
        :data="data"
        :props="treeProps"
        :default-expanded-keys="[value]"
        highlight-current
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from "vue";

export default defineComponent({
  name: "TreeSelect",
  props: {
    // v-model绑定
    value: {
      type: [String, Number],
      default: 0,
    },
    // 树形的数据
    data: {
      type: Array,
      default:[]
    },
    // 每个树节点用来作为唯一标识的属性
    nodeKey: {
      type: [String, Number],
      default: "id",
    },
    // tree的props配置
    treeProps: {
      type: Object,
      default: {
        label: "name",
        children: "children",
      },
    },
  },
  setup(props, context) {
    const state = reactive({
      // 当前选中id
      id: 0,
      // 当前选中名称
      name: '---',
    });
    const select = ref(null);
    const tree = ref(null);

    /**
     * @version: V1.1.5
     * @author: 吴志远
     * @todo: 节点点击
     * @Date: 2022-05-05 17:43:32
     * @param {*} data
     */    
    const handleNodeClick = (data:any)=> {
      // @ts-ignore
      context.emit("selectChange", data[props.nodeKey]);
      select.value.visible = false;
    }
    /**
     * @description: 
     * @version: V1.1.5
     * @author: 吴志远
     * @todo: 清除恢复顶级
     * @Date: 2022-05-05 17:43:53
     */ 
    const clear = ()=> {
      context.emit("selectChange", 0);
      state.id = 0;
      // @ts-ignore
      state.name = '---';
    }

    const render = ()=> {
      tree.value.setCurrentKey(props.value);
      let node = tree.value.getNode(props.value);
      // @ts-ignore
      state.id = props.value;
      state.name = node.label;
    }

    onMounted(()=>{
      if(props.value) {
        render();
      }
    })

    watch(()=>props.value,(val)=>{
      if(val) {
        render();
      }else {
        state.id = 0;
        state.name = '---';
      }
    }) 

    return {
      ...toRefs(state),
      select,
      tree,
      handleNodeClick,
      clear
    }
  },
});
</script>

<style lang="scss" scoped>
.option {
  height: auto;
  line-height: 1;
  padding: 0;
  background-color: #fff;
}

.tree {
  padding: 4px 20px;
  font-weight: 400;
}
</style>