<template>
  <div class="footer">
    <div class="footerBox">
      <div>
        <span>© Filseclab Corporation 京ICP备09054277号</span>
        <a class="ml" href='http://filseclab.com/zh-cn/links.htm' target="_blank">友情链接</a>
        |
        <a href="http://filseclab.com/zh-cn/privacy.htm" target="_blank">隐私条款</a>
      </div>
      <div>
        <span @click="target('home')" class="pointer">首页</span>
        |
        <span @click="target('product')" class="pointer">产品</span>
        |
        <a class="pointer" href="http://filseclab.com/zh-cn/contact.htm" target="_blank">联系我们</a>
        <a class="ml" href="http://facebook.com/filseclab"><img src="http://filseclab.com/images/logo_facebook.png" alt="" /></a>
        <a class="ml" href="http://twitter.com/filseclab"><img src="http://filseclab.com/images/logo_twitter.png" alt="" /></a>
        <a class="ml" href="http://www.linkedin.com/in/filseclab"><img src="http://filseclab.com/images/logo_linkedin.png" alt="" /></a>
        <a class="ml" href="mailto:kefu@filseclab.com"><img src="http://filseclab.com/images/logo_email.png" alt="" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup(){
    const router = useRouter()
    const target = type =>{
      if(type==='home'){
        router.push('/home')
      }else{
        console.log(1);
        router.push('/product')
      }
    }
    return{
      target
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  height: 0.48rem;
  background-color: #696969;
  color: #fff;
  font-size: .12rem;
  .footerBox {
    width: 12rem;
    height: .48rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
a{
  color: #fff;
}
.pointer{
    cursor: pointer;
}
.ml{
    margin-left: .5em;
    img{
        vertical-align: middle;
        transform: translateY(-2px);
    }
}
</style>