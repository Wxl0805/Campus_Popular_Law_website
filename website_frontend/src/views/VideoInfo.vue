<template>
  <div class="cont">
    <div class="title">{{ info.title }}</div>
    <div class="middle">
      <span>发布时间：{{ info.time }}</span>
      <span>来源：{{ info.author }}</span>
    </div>
    <div class="video">
      <video style="width: 100%;height: 100%;outline: 0;" :src="info.videoUrl" controls></video>
    </div>
  </div>
</template>

<script>
import { getVideoById } from '@/api/video'
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute();
    const info = reactive({
      videoId: '',
      title: '',
      time: '',
      author: '',
      videoUrl: '',
    })

    const getVideo = async() => {
      const data = await getVideoById(info.videoId);
      if(data.code == '0'){
        info.title = data.data.title;
        info.time = data.data.time;
        info.author = data.data.author;
        info.videoUrl = data.data.videoUrl;
      }
    }

    onMounted(() => {
      info.videoId = route.query.videoId;
      getVideo();
    })

    return {
      info,
    }
    
  },
}
</script>

<style lang="scss" scoped>
.cont {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 1000px;
  .title {
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .middle {
    height: 80px;
    font-size: 18px;
    color:#9ea3bb;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #9ea3bb;
    :nth-child(1){
      margin-right: 50px;
    }
  }
  .video {
    width: 400px;
    height: 300px;
    margin: 50px auto;
  }
}
</style>