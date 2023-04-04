<template>
  <div class="cont">
    <el-tabs
      type="border-card"
      @tab-change="tabChange"
    >
      <el-tab-pane label="在线留言">
        <h3>欢迎在下方进行留言，有各种问题都可以在这里留言，我们将就提出的问题进行改进。</h3>
        <div class="outform">
          <div class="innerform">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
            >
              <el-form-item
                label="姓名："
                prop="name"
              >
                <el-input v-model="ruleForm.name" />
              </el-form-item>
              <el-form-item
                label="电子邮件："
                prop="email"
              >
                <el-input v-model="ruleForm.email" />
              </el-form-item>
              <el-form-item
                label="手机号："
                prop="phone"
              >
                <el-input v-model="ruleForm.phone" />
              </el-form-item>
              <el-form-item
                label="标题："
                prop="title"
              >
                <el-input
                  v-model="ruleForm.title"
                  maxlength="50"
                />
              </el-form-item>
              <el-form-item
                label="内容："
                prop="cont"
              >
                <el-input
                  v-model="ruleForm.cont"
                  type="textarea"
                  :rows="6"
                  maxlength="200"
                  show-word-limit
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  class="button-submit"
                  color="red"
                  @click="submitForm(ruleFormRef)"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="留言选登">
        <div class="leave-message">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="list-block"
            @click="toMessageInfo(item.id)"
          >
            <span>{{ item.title }}</span>
            <span>{{ item.time }}</span>
          </div>
        </div>
        <div class="paginationStyle">
          <el-pagination
            background
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { dateChangeFormat } from '../utils/dateFormatter';
import { submitMessage, getMessage } from '../api/message'
import storage from '../utils/storage'
import { useRouter } from 'vue-router';
export default {
  name: 'FeedbackMessage',
  setup () {
    const router = useRouter();

    const ruleFormRef = ref(null);
    const ruleForm = reactive({
      name: '',
      email: '',
      phone: '',
      title: '',
      cont: '',
    });

    const validatorTitle = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('标题不能为空'));
      } else {
        callback();
      }
    }

    const validatorCont = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('内容不能为空'));
      } else {
        callback();
      }
    }

    const validatorName = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('姓名不能为空'));
      } else {
        callback();
      }
    }

    const validatorPhone = (rule, value, callback) => {
      const telreg = /^1[3-9]\d{9}$/;
      if (value == '' && ruleForm.email == '') {
        callback(new Error('手机号和邮箱至少填写一个'));
      } else if (value && !telreg.test(value)) {
        callback(new Error('手机号格式错误'));
      } else {
        callback();
      }
    }

    const validatorEmail = (rule, value, callback) => {
      const emailreg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/;
      if (value == '' && ruleForm.phone == '') {
        callback(new Error('手机号和邮箱至少填写一个'));
      } else if (value && !emailreg.test(value)) {
        callback(new Error('邮箱格式错误'));
      } else {
        callback();
      }
    }

    const rules = reactive({
      title: [{ validator: validatorTitle, trigger: 'blur' }],
      cont: [{ validator: validatorCont, trigger: 'blur' }],
      name: [{ validator: validatorName, trigger: 'blur' }],
      phone: [{ validator: validatorPhone, trigger: 'blur' }],
      email: [{ validator: validatorEmail, trigger: 'blur' }],
    })

    // 留言选登
    const list = ref([]);
    const page = ref(1);
    const pageSize = ref(10);
    const total = ref(0);

    // 切换当前页事件
    const handleCurrentChange = (val) => {
      page.value = val;
      getMessagePage();
    };

    // 获取时间戳，转换成datetime
    const getDate = () => {
      let timestamp = Date.parse(new Date());
      let date = new Date(timestamp);
      date = dateChangeFormat('YYYY-mm-dd HH:MM:SS', date);
      return date;
    }

    // 清空表单
    const resetForm = () => {
      ruleForm.title = '';
      ruleForm.cont = '';
      ruleForm.name = '';
      ruleForm.phone = '';
      ruleForm.email = '';
    }

    // 获取留言
    const getMessagePage = async () => {
      const data = await getMessage({ page: page.value, pageSize: pageSize.value });
      if (data.code == '0') {
        list.value = data.data.list;
        total.value = data.total;
      } else {
        list.value = [];
      }
    }

    getMessagePage();

    // 切换标签
    const tabChange = (val) => {
      if (val == 1) {
        getMessagePage();
      }
    }

    // 跳转到留言详情
    const toMessageInfo = (val) => {
      router.push({ path: '/messageinfo', query: { id: val } });
    }

    // 提交事件
    const submitForm = (formEl) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          try {
            const data = await submitMessage({ title: ruleForm.title, content: ruleForm.cont, userId: storage.get('info') ? storage.get('info').userId : null, userName: ruleForm.name, phone: ruleForm.phone, email: ruleForm.email, time: getDate() })
            if (data.code == '0') {
              resetForm();
              ElNotification({
                title: 'Success',
                type: 'success',
                message: '提交成功',
                duration: 2000,
              });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          return false;
        }
      })
    }

    return {
      ruleForm,
      ruleFormRef,
      submitForm,
      list,
      page,
      pageSize,
      total,
      handleCurrentChange,
      rules,
      toMessageInfo,
      tabChange
    }
  }

}
</script>

<style lang='scss' scoped>
.cont {
  --el-color-primary: red;
  font-size: 16px;
  padding: 20px;
  .outform {
    width: 600px;
    padding: 20px;
    text-align: center;
    margin: 50px auto;
    border: 1px solid #c9c7c7;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    .innerform {
      width: 70%;
    }
  }
  .leave-message {
    width: 800px;
    height: 400px;
    padding: 20px;
    text-align: center;
    margin: 10px auto;
    border: 1px solid #c9c7c7;
    border-radius: 5px;
    box-sizing: border-box;
    .list-block {
      width: 100%;
      height: 35px;
      display: flex;
      border-bottom: 1px solid #c9c7c7;
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: #b9b1b1, $alpha: 0.1);
      }
      span:nth-child(1) {
        font-size: 15px;
        color: #111111;
        font-weight: 500;
      }
      span:nth-child(2) {
        font-size: 14px;
        color: #9ea3bb;
      }
    }
  }
}
// tab标签属性
:deep(.el-tabs__item) {
  padding: 10px 20px !important;
  height: fit-content !important;
  line-height: normal;
  font-size: 16px !important;
}
// .el-icon修改居中
// :deep(.el-icon) {
//   left: 50%;
//   transform: translateX(-50%);
// }
.paginationStyle {
  display: flex;
  justify-content: center;
}
:deep(.el-form-item__content) {
  justify-content: center;
}
:deep(.button-submit) {
  width: 150px !important;
  height: 40px !important;
}
</style>