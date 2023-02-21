<template>
  <div class="box">
    <ul class="news">
      <li v-for="(item,index) in newsList" :key="index">
        <a :href="item.url">{{item.title}}</a>
      </li>
    </ul>
    <ul class="update">
      <li v-for="(item,index) in updateLog" :key="index">{{item.title}}</li>
      <li class="more">
        <a href="http://filseclab.com/zh-cn/history/index.htm">更多新闻...</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    newsList:{
      type:Array,
      default:()=>[]
    },
    updateLog:{
      type: Array,
      default:()=>[]
    }
  }
};
</script>
<style lang="scss" scoped>
.box{
  width: 12rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: .7rem;
  .news,.update{
    width: 50%;
    li{
      font-size: .16rem;
      line-height: .3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover{
        overflow: visible;
        white-space: normal;
        background-color: lightcyan;
      }
      a{
        color: #f90;
      }
    }
  }
  .update{
    position: relative;
    .more{
      position: absolute;
      bottom: 0;
      right: 0;
      text-align: right;
      &:hover{
        background-color: none;
      }
    }
  }
}
</style>