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
                  style="width: 100px;"
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
          >
            <span>{{ item.title }}</span>
            <span>{{ item.time }}</span>
          </div>
        </div>
        <div class="paginationStyle">
          <el-pagination
            background
            :current-page="1"
            layout="total, prev, pager, next, jumper"
            :total="50"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
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

    // 留言选登
    const list = [
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
      { title: '为什么登不上了', time: '2021-01-01' },
    ];

    // 切换当前页事件
    const handleCurrentChange = () => {
      console.log('切换成功');
    };

    // 提交事件
    const submitForm = async (ruleFormRef) => {
      if (!ruleFormRef) return;
      await ruleFormRef.validate(valid => {
        if (valid) {
          console.log('成功');
          ElMessage({
            message: '提交成功',
            type: 'success',
            center: true,
          })
        } else {
          ElMessage({
            message: '提交失败',
            type: 'error',
            center: true,
          })
          console.log('失败');
        }
      })
    }

    return {
      ruleForm,
      ruleFormRef,
      submitForm,
      list,
      handleCurrentChange,
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
    width: 600px;
    height: 550px;
    padding: 20px;
    text-align: center;
    margin: 50px auto;
    border: 1px solid #c9c7c7;
    border-radius: 5px;
    box-sizing: border-box;
    .list-block {
      width: 100%;
      height: 50px;
      display: flex;
      border-bottom: 1px solid #c9c7c7;
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: #cb3939, $alpha: 0.1);
      }
      span:nth-child(1) {
        font-size: 20px;
        font-size: 16px;
        color: #111111;
      }
      span:nth-child(2) {
        font-size: 14px;
        color: #c9c7c7;
      }
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
</style>