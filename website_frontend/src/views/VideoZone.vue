<template>
  <div class="cont">
    <div class="video_block" v-for="(item, index) in list" :key="index">
      <div class="video_div">
        <img src="../assets/pufa_logo.jpg" alt="">
        <div class="video_icon"></div>
      </div>
      <div class="video_cont">
        <span>湖北省总工会公益视频：我是工会，我是你娘家人</span>
        <span>2022-01-01</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'VideoZone',
    components:{
    
    },
    setup() {
      const list = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ];
      return {
        list,
      }
    },
}
</script>

<style lang='scss' scoped>
.cont{
  width: 1300px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: auto;
  padding-top: 20px;
  .video_block{
    .video_div{
      width: 300px;
      height: 200px;
      background: rgb(214, 210, 210);
      padding: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .video_icon {
        position: absolute;
        width: 40px;
        height: 40px;
        background: url('../assets/icon_video.png') no-repeat;
        background-size: 100% 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .video_cont {
      width: 300px;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      color: rgb(171, 164, 164);
      span:nth-child(1) {
        margin: 10px 0;
        font-size: 18px;
        font-weight: bold;
        color: #000;
      }
    }
  }
}
</style>