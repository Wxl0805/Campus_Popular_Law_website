<template>
  <div class="cont">
    <span class="title">{{ title }}</span>
    <span class="user-title"><span class="user">{{ userName }}</span>的留言:</span>
    <span class="text">{{ cont }}</span>
    <span class="time">{{ time }}</span>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMessageByid } from '@/api/message';
export default ({
  name: 'MessageInfo',
  setup () {
    const route = useRoute();

    const id = ref(null);
    onBeforeMount(() => {
      id.value = route.query.id;
      queryMessage();
    })
    const title = ref('');
    const userName = ref('');
    const cont = ref('');
    const time = ref('');

    const queryMessage = async () => {
      const data = await getMessageByid(id.value);
      if (data.code == '0') {
        title.value = data.data.title;
        userName.value = data.data.userName;
        cont.value = data.data.content;
        time.value = data.data.time;
      }
    }

    return {
      title,
      userName,
      cont,
      time,
    }
  },
})
</script>

<style lang="scss" scoped>
.cont {
  width: 100%;
  height: calc(100vh - 114px);
  display: flex;
  flex-direction: column;
  padding: 0 400px;
  box-sizing: border-box;
  span {
    margin-top: 30px;
  }
  .title {
    font-size: 25px;
    font-weight: bold;
    margin: 30px auto 0;
  }
  .user-title {
    font-size: 20px;
    font-weight: 500;
    .user {
      font-size: 21px;
      font-weight: 700;
      letter-spacing: 2pt;
      font-style: italic;
      margin-right: 5px;
    }
  }
  .text {
    font-size: 15px;
    color: #000;
    text-indent: 2em;
    font-weight: 400;
    letter-spacing: 2pt;
    line-height: 30px;
  }
  .time {
    font-size: 14px;
    color: #9ea3bb;
    display: flex;
    align-self: flex-end;
  }
}
</style>