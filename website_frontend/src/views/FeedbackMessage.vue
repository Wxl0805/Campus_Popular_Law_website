<template>
  <div class="cont">
    <el-tabs type="border-card">
      <el-tab-pane label="在线留言">
        <h3>欢迎在下方进行留言，有各种问题都可以在这里留言，我们将就提出的问题进行改进。</h3>
        <div class="outform">
          <div class="innerform">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
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
                prop="telphone"
              >
                <el-input v-model="ruleForm.telphone" />
              </el-form-item>
              <el-form-item
                label="学校："
                prop="school"
              >
                <el-input v-model="ruleForm.school" />
              </el-form-item>
              <el-form-item
                label="标题："
                prop="title"
              >
                <el-input v-model="ruleForm.title" />
              </el-form-item>
              <el-form-item
                label="内容："
                prop="cont"
              >
                <el-input
                  v-model="ruleForm.cont"
                  type="textarea"
                  :rows="6"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm(ruleFormRef)"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="留言选登">留言选登</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  name: 'FeedbackMessage',
  setup () {
    const ruleFormRef = ref(null);
    const ruleForm = reactive({
      name: '',
      email: '',
      telphone: '',
      school: '',
      title: '',
      cont: '',
    });

    // 提交事件
    const submitForm = async (ruleFormRef) => {
      console.log(111);
      if (!ruleFormRef) return;
      console.log(222);
      await ruleFormRef.validate(valid => {
        if (valid) {
          console.log('成功');
          ElMessage({
            message: '提交成功',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '提交失败',
            type: 'error',
          })
          console.log('失败');
        }
      })
    }

    return {
      ruleForm,
      ruleFormRef,
      submitForm,
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
}
// tab标签属性
:deep(.el-tabs__item) {
  padding: 10px 20px !important;
  height: fit-content !important;
  line-height: normal;
  font-size: 20px !important;
}
</style>