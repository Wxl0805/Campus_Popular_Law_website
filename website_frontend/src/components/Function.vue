<template>
  <div class="function">
    <div class="fnInfo">
      <div v-for="(item, index) in fnData" :key="index" class="one">
        <img :src="item.img" alt="" />
        <div>
          <h6 v-for="(iten, inde) in item.title" :key="inde + 'a'">{{ iten }}</h6>
          <p v-if="item.desc" class="desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
    <div class="more">
      <a v-if="more" href="javascript:;" @click="aaa" >了解更多 | </a>
      <a href="http://filseclab.com/documents/twister8tech_zh-cn.pdf">技术文档</a>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    fnData: {
      type: Array,
      default: () => [],
    },
    more:{
      type: Boolean,
      default: () => false
    }
  },
  setup(){
    const router = useRouter()
    const aaa=()=>{
      router.push('/product')
    }
    return {
      aaa
    }
  }
};
</script>

<style lang="scss" scoped>
.function {
  width: 12rem;
  margin: auto;
  // margin-top: .8rem;
}
.fnInfo{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    font-size: 0;
    .one{
        width: 25%;
        display: flex;
        align-items: center;
        margin-bottom: .5rem;
        img{
            width: .6rem;
            margin-right: .2rem;
            &:hover{
                transition: all 1s;
                animation: myScale .6s 1;
            }
        }
        h6{
            font-size: .14rem;
            color: #333;
        }
        .desc{
          display: -webkit-box;
          width: 90%;
          font-size: .12rem;
          color: #7d7d7d;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
    }
}
.more{
    color: #464646;
    font-size: .14rem;
    text-align: right;
    margin-bottom: .5rem;
    a{
        color: #e87f00;
    }
}
@keyframes myScale {
    0% {transform: scale(1,1)}
    50% {transform:scale(.8,.8)}
    100% {transform: scale(1,1)}
}
</style>