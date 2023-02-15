<template>
  <div class="user-manage">
      <ZyTable
        ref="zytab"
        rowKey="userId"
        :showOperArea="true"
        :showCheckbox="true"
        :operWidth="160"
        operFixed="right"
        :showOrder="false"
        :headerCellStyle="{ 'background-color': '#F2F2F2', height: '54px', padding: '0', color: '#111'}"
        :cellStyle="{ height: '54px', padding: '0', color: '#666' }"
        :tableData="userTable"
        :columnGroup="tabShowList"
        :changeStyleList="changeStyleList"
        :pageInfo="pageInfo"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
        @handleSearch="handleSearch"
        @createClicked="createClicked"
        @batchDeleteClicked="batchDeleteClicked"
        @expandChange="expandChange"
      >
        <template v-slot:filter>
          <div class="search">
            <el-select class="status" size="small" v-model="searchInfo.status" placeholder="用户状态" @change="handleSearch(null)" clearable>
              <el-option label="激活" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </div>
        </template>
        <template v-slot:avatar="slotProps">
          <el-avatar :size="40" :src="slotProps.item.avatar || require('@/assets/nophoto.png')" style="vertical-align: middle;"></el-avatar>
        </template>
        <template v-slot:status="slotProps">
          <el-switch 
            :model-value="slotProps.item.status" 
            active-color="#13ce66" 
            :active-value="1" 
            active-text="激活" 
            :inactive-value="2"
            inactive-text="禁用"
            @change="statusChange($event,slotProps.item.userId)">
          </el-switch>
        </template>
        <template v-slot:oper="slotProps">
          <span class="oper">
            <i class="oper-icon edit-icon fa-pencil-square-o" @click="modifyClicked(slotProps.item)"></i>
            <i class="oper-icon del-icon fa-trash-o" @click="deleteClicked(slotProps.item)"></i>
            <i class="resetpass" @click="resetPass(slotProps.item)">重置密码</i>
          </span>
        </template>
      </ZyTable>
  </div>
  <div class="user-dialog">
    <el-dialog 
      :title="isAdd?'新建用户':'修改用户'" 
      v-model="showUserDialog" 
      :close-on-click-modal="false" 
      @closed="closeDialog"
      top="50px">
      <el-form
        ref="ruleForm"
        status-icon
        :rules="rules"
        :model="userForm"
      >
        <el-form-item label="登录账号：" prop="userName">
          <el-input
            size="small"
            placeholder="请输入用户名"
            v-model.sync.trim="userForm.userName"
            :disabled="isAdd ? false : true"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input
            size="small"
            placeholder="请输入用户姓名"
            v-model.trim="userForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="isAdd" label="密码：" prop="password">
          <el-input
            size="small"
            placeholder="请输入密码"
            v-model.trim="userForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="isAdd" label="确认密码：" prop="checkPassword">
          <el-input
            size="small"
            placeholder="请再次确认密码："
            v-model.trim="userForm.checkPassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="mobile">
          <el-input
            size="small"
            placeholder="请输入联系电话"
            v-model.trim="userForm.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input
            size="small"
            placeholder="请输入邮箱"
            v-model="userForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门：" prop="departmentId"> 
          <el-select
            size="small"
            v-model="userForm.departmentId"
            placeholder="请选择部门"
            filterable
          >
            <el-option
              v-for="item in deptOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <el-select
            size="small"
            v-model="userForm.roleId"
            placeholder="请选择角色"
            filterable
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="激活：" v-if="isAdd">
          <el-switch 
            v-model="userForm.status" 
            active-color="#13ce66" 
            :active-value="1" 
            :inactive-value="2">
          </el-switch>
        </el-form-item>
        <el-form-item label="用户头像：">
          <el-upload
            class="myavatar"
            action="#"
            :show-file-list="false"
            :http-request="uploadImg"
            :before-upload="beforeUpload">
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
            <i v-else class="fa-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="showUserDialog=false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitUserFrom">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs, unref } from "vue"
import ZyTable from "@/components/ZYTable.vue"
import { Plus } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import {useStore} from "vuex";
import md5 from 'js-md5'
import { validateUserName, validateName, validatePass, validatePhone, validateEmail } from '@/utils/validateFunction'
import { queryUserApi, createUserApi, modifyUserApi, delUserApi, modifyPassApi, modifyStatusApi } from "@/api/modules/user"
import { getAllDepartmentApi } from "@/api/modules/department"
import { getAllRoleApi, getRoleAuthorityApi } from "@/api/modules/role"
import { getName } from "@/utils/toolFunction"
import { getRoutes } from '@/router';
import axios from 'axios';
import moment from "moment"
export default defineComponent({
  components: { ZyTable, Plus },
  setup() {
    // 确认密码验证
    const validateCheckPass = (rule: any, value: any, callback: Function) => {
      if (value !== state.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
        state.userForm.checkPassword = '';
      } else {
        callback();
      }
    };
    const store = useStore();
    const state = reactive({
      // 表格展示的数据
      userTable: [],
      // 表格展示列
      tabShowList: [{
        prop: "avatar",
        name: "用户头像",
        fixed: 'left'
      },{
        prop: "userName",
        name: "登录账号",
      },{
        prop: "name",
        name: "姓名",
        fixed: 'left'
      },{
        prop: "mobile",
        name: "联系电话",
      },{
        prop: "email",
        name: "邮箱",
      },{
        prop: "departmentName",
        name: "所属部门",
      },{
        prop: "roleName",
        name: "所属角色",
      },{
        prop: "status",
        name: "状态",
        width: 140
      }],
      // 需要使用插槽的列
      changeStyleList:['avatar','status'],
      // 页面数据
      pageInfo: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        name: null,
      },
      // 搜索信息
      searchInfo: {
        name: '',
        status: null,
      },
      // 展开的行的key
      expandRowKeys: [],
      // 是否打开添加或修改用户弹层
      showUserDialog: false,
      // 添加还是修改
      isAdd: true,
      // 用户信息表单
      userForm: {
        userId: null,
        userName: '',
        password: '',
        checkPassword: '',
        name: '',
        roleId: null, 
        mobile: '', 
        avatar: '', 
        departmentId: null, 
        email: '',
        status: 2,
      },
      // 部门选项
      deptOptions: [],
      // 角色选项
      roleOptions: [],
      // 用户表验证规则
      rules: {
        userName: [
          { required: true, validator: validateUserName, trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur"},  
        ],
        name: [
          { required: true, validator: validateName, trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur"},
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validateCheckPass, trigger: "blur" },
        ],
        mobile: [
          { validator: validatePhone, trigger: "blur" },
        ],
        email: [
          { validator: validateEmail, trigger: "blur" },
        ],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        roleId: [
          { required: true, message: "请选择角色", trigger: "blur" },
        ],
      },
    })

    // 表格ref
    const zytab = ref(null);
    // 用户表单ref
    const ruleForm = ref(null);

    // 获取所有部门
    const getAllDepartments = async()=> {
      const res:any = await getAllDepartmentApi();
      if(res.code === '0000000') {
        state.deptOptions.length = 0;
        res.data.forEach((item:any)=>{
          state.deptOptions.push({
            value: item.departmentId,
            label: item.departmentName
          })
        })
      }
    }

    // 获取所有角色
    const getAllRoles = async()=> {
      const res:any = await getAllRoleApi();
      if(res.code === '0000000') {
        state.roleOptions.length = 0;
        res.data.forEach((item:any)=>{
          state.roleOptions.push({
            value: item.roleId,
            label: item.roleName
          })
        })
      }
    }

    // 渲染数据
    const renderTabData = async()=> {
      const res:any = await queryUserApi({
        pageNo: state.pageInfo.currentPage,
        pageSize: state.pageInfo.pageSize,
        searchInfo: state.searchInfo.name,
        status: state.searchInfo.status
      })
      if(res.code === '0000000') {
        state.userTable.length = 0;
        res.data.dataList.forEach(item=>{
          state.userTable.push({
            userId: item.userId,
            userName: item.userName,
            name: item.name,
            roleId: item.roleId, 
            roleName: getName(item.roleId, state.roleOptions), 
            mobile: item.mobile, 
            avatar: item.avatar, 
            departmentId: item.departmentId, 
            departmentName: getName(item.departmentId,state.deptOptions), 
            email: item.email,
            status: item.status?item.status:null,
          });
        }),
        state.pageInfo.currentPage = res.data.pageNo;
        state.pageInfo.pageSize = res.data.pageSize;
        state.pageInfo.total = res.data.total;
      }
    }

    // 当前页码改变
    const currentChange = (val:number)=> {
      state.pageInfo.currentPage = val;
      renderTabData();
    }
 
    // 页面最多数量改变
    const sizeChange = (val:number)=>{
      state.pageInfo.pageSize = val;
      renderTabData();
    }

    // 搜索
    const handleSearch = (searchInfo?:string)=> {
      if(searchInfo === null) {
        // 当切换状态搜索时
        zytab.value.clearCheckboxs();
      }
      if( searchInfo !== null ) {
        state.searchInfo.name = searchInfo;
      }
      state.pageInfo.currentPage = 1;
      renderTabData();
    }

    // 添加
    const createClicked = ()=> {
      state.showUserDialog = true;
      state.isAdd = true;
    }

    // 修改
    const modifyClicked = (item:any)=> {
      state.showUserDialog = true;
      state.isAdd = false;
      nextTick(()=>{
        state.userForm.userId = item.userId;
        state.userForm.userName = item.userName;
        state.userForm.name = item.name;
        state.userForm.roleId = item.roleId;
        state.userForm.mobile = item.mobile;
        state.userForm.avatar = item.avatar;
        state.userForm.departmentId = item.departmentId;
        state.userForm.email = item.email;
        state.userForm.status = item.status;
      })
    }

    // 删除
    const deleteClicked = (item:any)=>{
      ElMessageBox.confirm('你确定要删除该用户?','删除用户',{
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning',
      }).then(() => {
        delUserApi({ ids: [item.userId] }).then((res:any)=>{
          if(res.code == 0) {
            ElMessage.success('删除成功');
            if((state.pageInfo.total % state.pageInfo.pageSize) == 1 && state.pageInfo.currentPage !== 1) {
              state.pageInfo.currentPage -= 1; 
            }
            renderTabData();
          }
        })
      }).catch(err=>{
        return err;
      })
    }

    // 批量删除
    const batchDeleteClicked = (selection)=> {
      if(selection.length === 0) {
        ElMessage.warning('至少选择一条数据');
        return;
      }
      let ids = [];
      selection.forEach((item:any)=>{
        ids.push(item.userId);
      })
      ElMessageBox.confirm('你确定要删除所选用户?','批量删除用户',{
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning',
      }).then(() => {
        delUserApi({ ids: ids }).then((res:any)=>{
          if(res.code == 0) {
            ElMessage.success('删除成功');
            if((state.pageInfo.total % state.pageInfo.pageSize) == ids.length && state.pageInfo.currentPage !== 1) {
              state.pageInfo.currentPage -= 1; 
            }
            renderTabData();
          }
        })
      }).catch(err=>{
        return err;
      })
    }

    // 重置密码
    const resetPass = (item:any)=> {
      ElMessageBox.confirm('你确定要重置该用户密码?','重置密码',{
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning',
      }).then(() => {
        modifyPassApi({ userId: item.userId }).then((res:any)=>{
          if(res.code == 0) {
            ElMessage.success('密码已重置');
            renderTabData();
          }
        })
      }).catch(err=>{
        return err;
      })
    }

    // 修改用户状态switch
    const statusChange = (status:number,userId:number)=> {
      if(!userId) return;
      modifyStatusApi({
        userId: userId,
      }).then((res:any)=>{
        if(res.code == 0) {
          ElMessage.success('状态修改成功');
          renderTabData();
        }
      })
    }

    // 树形表格展开收缩触发
    const expandChange = (row:any,expanded:boolean)=> {
      // 里面的id来源于表格组件中的rowKey,如为其他的，这也得更换
      if(expanded) {
        state.expandRowKeys.push(row.userId);
      }else {
        let i = state.expandRowKeys.indexOf(row.userId);
        state.expandRowKeys.splice(i,1)
      }
    }

    // 提交用户表单
    const submitUserFrom = ()=> {
      const form = unref(ruleForm);
      if(!form) return;
      // 先对登录表单进行验证
      form.validate((valid:any)=> {
        if(valid) {
          // 添加时提交
          if(state.isAdd) {
            createUserApi({
              userName: state.userForm.userName,
              password: md5(state.userForm.password),
              name: state.userForm.name,
              roleId: state.userForm.roleId, 
              mobile: state.userForm.mobile, 
              avatar: state.userForm.avatar, 
              departmentId: state.userForm.departmentId, 
              email: state.userForm.email,
              status: state.userForm.status,
            }).then((res:any)=>{
              if(res.code == 0) {
                ElMessage.success('新建成功');
                state.showUserDialog = false;
                state.pageInfo.currentPage = 1; 
                renderTabData();
              }
            })
          }else {
            // 修改时提交
            modifyUserApi({
              userId:state.userForm.userId,
              name: state.userForm.name,
              roleId: state.userForm.roleId, 
              mobile: state.userForm.mobile, 
              avatar: state.userForm.avatar, 
              departmentId: state.userForm.departmentId, 
              email: state.userForm.email,
            }).then((res:any)=>{
              if(res.code == 0) {
                ElMessage.success('修改成功');
                state.showUserDialog = false;
                renderTabData();
                // 当修改用户是自己角色时
                if(state.userForm.userId === store.state.user.userId) {
                  // 当改变了自己的角色，更新路由
                  if(state.userForm.roleId !== store.state.user.roleId) {
                    getRoleAuthorityApi({roleId: state.userForm.roleId}).then((ret:any)=>{
                      if(ret.code === '0000000') {
                        let arr = [];
                        if(ret.data.length > 0) {
                          ret.data.forEach(item=>{
                            arr.push(item.authorityUrl);
                          })
                        }
                        store.commit('SET_ROLELIST',arr);
                        setTimeout(()=>{
                          getRoutes(store);
                        })
                      }
                    })
                  }
                  // 更新当前登录者信息
                  store.commit('SET_NAME',state.userForm.name);
                  store.commit('SET_ROLEID',state.userForm.roleId);
                  store.commit('SET_MOBILE',state.userForm.mobile);
                  store.commit('SET_AVATAR',state.userForm.avatar);
                  store.commit('SET_DEPARTMENTID',state.userForm.departmentId);
                  store.commit('SET_EMAIL',state.userForm.email);
                } 
              }
            })
          }
        }
      })
    }

    // 关闭用户弹层
    const closeDialog = ()=> {
      state.userForm.userId = null;
      state.userForm.status = 2;
      state.userForm.avatar = '';
      ruleForm.value.resetFields();
    }

    // 图片上传之前
    const beforeUpload = (file)=> {
      const type = file.type.split('/')[1].toLowerCase();
      const isPic = ['jpeg', 'png', 'gif', 'jpg', 'webp','svg']
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isPic.includes(type)) {
        ElMessage.error('上传图片只能是 ' + isPic + ' 格式!')
      }
      if (!isLt3M) {
        ElMessage.error('上传头像图片大小不能超过 3MB!')
      }
      return isPic && isLt3M
    }

    // 上传图片
    const uploadImg = async(item)=> {
      let formData = new FormData();
      formData.append('image', item.file);
      const res:any = await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/user/upload',
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': localStorage.getItem('token')
        }
      });
      if(res.data.code === '0000000') {
        state.userForm.avatar = res.data.filename;  
      }else {
        ElMessage.error('上传失败')
      }
    }

    // 页面渲染初所有接口调用
    const apis = async()=> {
      await getAllDepartments();
      await getAllRoles();
      await renderTabData();
    }
    apis();
    

    return {
      ...toRefs(state),
      zytab,
      ruleForm,
      currentChange,
      sizeChange,
      handleSearch,
      createClicked,
      modifyClicked,
      deleteClicked,
      batchDeleteClicked,
      resetPass,
      statusChange,
      expandChange,
      submitUserFrom,
      closeDialog,
      beforeUpload,
      uploadImg,
    }
  }
});
</script>

<style scoped lang='scss'>
.user-manage {
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  // *******************************父容器必备属性**********************************
  min-width: 680px; // 没有它表格上面那部分屏幕变窄会挤在一起,数据自己根据搜索条件的多少调节
  overflow: auto; // 没有它会溢出
  // *******************************父容器必备属性**********************************
  background-color: #fff;
    .search {
      display: flex;
      :deep(.el-select) {
        width: 130px;
      }
    }
    .oper {
      .oper-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        background-size: 100% 100%;
        cursor: pointer;
        font-size: 18px;
        margin-right: 16px;
        &.edit-icon {
          opacity: 0.8;
          &:hover {
            opacity: 1;
          }
        }
        &.del-icon {
          opacity: 0.8;
          &:hover {
            opacity: 1;
          }
        }
      }
      .resetpass {
        font-style: normal;
        line-height: 18px;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
    }

}
.user-dialog {
  :deep(.el-dialog) {
    width: 680px;
    .el-dialog__header {
      padding: 0;
      height: 56px;
      background: rgba(64, 145, 253, 0.05);
      border-top: 1px solid transparent;
      .el-dialog__title {
        display: inline-block;
        margin-top: 14px;
        margin-left: 32px;
        font-weight: 500;
        color: #333;
        font-size: 16px;
      }
      .el-dialog__close {
        font-size: 18px;
        color: #333333;
      }
    }
    .el-dialog__body {
      padding: 12px 32px;
      max-height: 380px;
      overflow: auto;
      .el-form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-form-item {
          width: 272px;
          min-height: 62px;
          height: 100%;
          flex-direction: column;
          margin-bottom: 10px;
          margin-top: 4px;
          .el-form-item__label {
            text-align: left;
            line-height: 22px;
          }
          .el-form-item__content {
            .el-form-item__error {
              margin-top: 4px;
              position: inherit;
            }
          }
          .myavatar {
            margin-top: 8px;
            .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              &:hover {
                border-color: #58595a;
              }
              .fa-plus {
                font-size: 28px;
                color: #8c939d;
                width: 120px;
                height: 120px;
                line-height: 120px;
                text-align: center;
              }
              .avatar {
                width: 120px;
                height: 120px;
                display: block;
              }
            }
          }
          .el-select {
            width: 272px;
            .el-icon-circle-close {
              &::before {
                color: #ff4d4f;
              }
            }
            .el-input__suffix {
              .el-select__caret {
                height: 32px;
              }
            }
            .el-icon-arrow-up {
              height: 28px;
            }
          }
          .el-icon-circle-check {
            line-height: 32px;
            &.el-input__validateIcon {
              display: none;
            }
          }
          .el-icon-circle-close {
            line-height: 32px;
            &.el-input__validateIcon {
              display: none;
            }
          }
        }
      }
    }
    .el-dialog__footer {
      border-top: 1px solid #e8e8e8;
      height: 56px;
      padding-top: 12px;
      padding-right: 24px;
      padding-bottom: 12px;
      .el-button {
        width: 65px;
        height: 32px;
      }
    }
  }
}
</style>