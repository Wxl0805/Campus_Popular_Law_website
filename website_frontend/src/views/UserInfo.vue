<template>
  <div class="cont">
    <div class="user">
      <span class="user-title">个人信息</span>
      <div class="info-block">
        <el-icon
          size="20px"
          color="red"
        >
          <User />
        </el-icon>
        <span class="info-title">身份证号:</span>
        <span class="info-cont">{{ user.idCard }}</span>
      </div>
      <div class="info-block">
        <el-icon
          size="20px"
          color="red"
        >
          <User />
        </el-icon>
        <span class="info-title">姓名:</span>
        <span class="info-cont">{{ user.userName }}</span>
      </div>
      <div class="info-block">
        <el-icon
          size="20px"
          color="red"
        >
          <User />
        </el-icon>
        <span class="info-title">班级:</span>
        <span class="info-cont">{{ user.userClass }}班</span>
      </div>
      <div class="info-block">
        <el-icon
          size="20px"
          color="red"
        >
          <User />
        </el-icon>
        <span class="info-title">角色:</span>
        <span class="info-cont">{{ user.identity }}</span>
      </div>
      <div class="info-block">
        <el-icon
          size="20px"
          color="red"
        >
          <User />
        </el-icon>
        <span class="info-title">所属年级:</span>
        <span class="info-cont">{{ user.grade }}</span>
      </div>
      <div class="info-block">
        <el-icon
          size="20px"
          color="red"
        >
          <User />
        </el-icon>
        <span class="info-title">手机号:</span>
        <el-input
          v-model="user.phone"
          placeholder="请输入手机号"
          style="width: 200px"
        >
        </el-input>
      </div>
      <div class="info-block">
        <el-icon
          size="20px"
          color="red"
        >
          <User />
        </el-icon>
        <span class="info-title">邮箱:</span>
        <el-input
          v-model="user.email"
          placeholder="请输入邮箱"
          style="width: 200px"
        >
        </el-input>
      </div>
      <el-button
        style="margin-top: 80px;width: 150px;height: 40px;"
        color="red"
        :loading="isloading"
        @click="submit"
      >更新信息</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { queryInfo, setInfo } from '@/api/user';
import storage from '../utils/storage'
// import store from '../store/index'
import { ElNotification } from 'element-plus' // 提示信息
export default {
  name: 'UserInfo',
  setup () {
    const isloading = ref(false);
    const user = reactive({
      idCard: '',
      userName: '',
      userClass: '',
      identity: '',
      grade: '',
      phone: '',
      email: ''
    })
    // 验证手机号
    const telreg = /^1[3-9]\d{9}$/;
    // 验证邮箱
    const emailreg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;
    // 提交信息
    const submit = async () => {
      if (user.phone && !telreg.test(user.phone)) {
        ElNotification({
          message: '手机号格式错误',
          duration: 2000,
          type: 'error',
          title: 'Error',
        });
        return;
      }
      if (user.email && !emailreg.test(user.email)) {
        ElNotification({
          message: '邮箱格式错误',
          duration: 2000,
          type: 'error',
          title: 'Error',
        });
        return;
      }
      const data = await setInfo({ userId: storage.get('info').userId, phone: user.phone, email: user.email });
      if (data.code == '0') {
        ElNotification({
          message: '修改成功',
          duration: 2000,
          type: 'success',
          title: 'Success',
        });
        getInfo();
      }
    }
    // 判断年级
    const judgeGrade = (val) => {
      if (val == 0) {
        return null;
      } else if (val == 1) {
        return '大一';
      } else if (val == 2) {
        return '大二';
      } else if (val == 3) {
        return '大三';
      } else if (val == 4) {
        return '大四';
      }
    }
    // 获取个人信息
    const getInfo = async () => {
      try {
        const data = await queryInfo(storage.get('info').userId);
        if (data.code == '0') {
          user.idCard = data.data.userId.slice(0, 6) + '******' + data.data.userId.slice(data.data.userId.length - 4);
          user.userName = data.data.userName;
          user.userClass = data.data.class;
          user.identity = data.data.identity == 1 ? '学生' : '老师';
          user.grade = judgeGrade(data.data.grade);
          user.phone = data.data.phone;
          user.email = data.data.email;
        }
      } catch (error) {
        // console.log(error);
      }

    }
    getInfo();

    // 监听vuex里面token是否存在，不存在跳转到登录页面
    // const token = ref('');
    // token.value = store.getters.getToken;
    // watch(token, (val) => {
    //   console.log(val);
    // })

    return {
      isloading,
      submit,
      user,
    }
  }
}
</script>

<style lang="scss" scoped>
.cont {
  width: 100%;
  height: calc(100vh - 114px);
  display: flex;
  justify-content: center;
  align-items: center;
  .user {
    width: 1000px;
    // height: 600px;
    background: rgba(245, 242, 242, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px 40px;
    .user-title {
      font-size: 30px;
    }
    .info-block {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid rgb(211, 211, 211);
      display: flex;
      align-items: center;
      .info-title {
        font-size: 18px;
        color: rgb(129, 127, 127);
        margin: 0 20px;
      }
      .info-cont {
        font-size: 18px;
      }
    }
  }
}
</style>