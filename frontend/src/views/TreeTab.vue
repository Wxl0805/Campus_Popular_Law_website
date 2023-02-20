<!--
 * @Author: [吴志远]
 * @Date: 2022-05-05 09:43:06
 * @LastEditors: 吴志远
 * @LastEditTime: 2022-05-07 14:19:13
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\views\TreeTab.vue
-->
<template>
  <div class="container">
    <!-- <ZyTreeSelect
      :value="value"
      :data="list"
      @selectChange="selectChange"
      style="width: 240px"
    ></ZyTreeSelect> -->
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import ZyTreeSelect from '@/components/ZyTreeSelect.vue'

export default defineComponent({
  components: { ZyTreeSelect },
  setup() {
    const state = reactive({
      list: [],
      value: 0,
    });
		const getData = ()=> {
			state.value = 4,
      state.list = [
        {
          name: "系统",
          id: 1,
          children: [
            { name: "用户", id: 2 },
            { name: "用户组", id: 3 },
            { name: "角色", id: 4 },
            { name: "菜单", id: 5 },
            { name: "组织架构", id: 6 },
          ],
        },
        {
          name: "商品",
          id: 7,
          children: [
            { name: "列表", id: 8, children:[
              {name: "添加1", id: 81}
            ] },
            { name: "添加", id: 9 },
            { name: "修改", id: 10 },
            { name: "删除", id: 11 },
            { name: "商品分类", id: 12 },
            { name: "分类修改", id: 13 },
          ],
        },
      ]
    }

    const selectChange = (val)=> {
      state.value = val;
    }

		getData();
    return {
      ...toRefs(state),
      selectChange,
    };
  },
});
</script>