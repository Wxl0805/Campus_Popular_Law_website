<template>
  <div class="user-manage">
    <div class="cont">
      <span><span class="first-span">留言标题：</span>{{ state.title }}</span>
      <span><span class="first-span">留言者：</span>{{ state.userName }}</span>
      <span><span class="first-span">留言者ID：</span>{{ state.userId }}</span>
      <span><span class="first-span">留言者手机号：</span>{{ state.phone }}</span>
      <span><span class="first-span">留言者邮箱：</span>{{ state.email }}</span>
      <div class="content">
        <span class="first-span">留言内容：</span>
        <div class="content-cont">
          <span>{{ state.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import {useRoute, useRouter} from "vue-router";

import {
  getMessageOneApi
} from "@/api/modules/message";
import { onMounted } from 'vue';
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      id: null,
      title: '',
      userName: '',
      userId: '',
      phone: '',
      email: '',
      time: '',
      content: '',
    });

    const getMessage = async() => {
      const data : any = await getMessageOneApi({id: state.id});
      if(data.code == '0000000'){
        state.title = data.data.title;
        state.userName = data.data.userName;
        state.userId = data.data.userId;
        state.phone = data.data.phone;
        state.email = data.data.email;
        state.time = data.data.time;
        state.content = data.data.content;
      }
    }

    onMounted(() => {
      state.id = route.query.id;
      getMessage();
    })

    return {
      state,
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
  .cont{
    display: flex;
    flex-direction: column;
    span{
      margin: 20px 0;
      font-size: 20px;
    }
    .first-span {
      font-size: 20px;
      font-weight: bold;
    }
    .content {
      margin: 20px 0;
      .content-cont {
        margin: 20px 0;
      }
    }
  }
}
</style>