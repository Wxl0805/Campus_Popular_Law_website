interface LoginObj {
  userId: number,
  userName: string, 
  avatar: string, 
  name: string,
  mobile: string,
  email: string,
  roleId: number, 
  classId:number, 
  roleList?: any
}

export default {
  state: {
    userId: null,
    userName: '', 
    avatar: '',
    name:'',
    mobile: '', 
    roleId: null, 
    classId:null, 
    email:'',
    roleList: null
  },
  mutations: {
    SET_USERID (state:any, userId:number) {
      state.userId = userId
    },
    SET_USERNAME (state:any, userName:string) {
      state.userName = userName
    },
    SET_AVATAR (state:any, avatar:string) {
      state.avatar = avatar
    },
    SET_NAME (state:any, name:string) {
      state.name = name
    },
    SET_MOBILE (state:any, mobile:string) {
      state.mobile = mobile
    },
    SET_EMAIL (state:any, email:string) {
      state.email = email
    },
    SET_ROLEID (state:any, roleId:number) {
      state.roleId = roleId
    },
    SET_CLASSID (state:any, classId:number) {
      state.classId = classId
    },
    SET_ROLELIST (state:any, roleList:any) {
      state.roleList = roleList
    },
    SET_USER_INFO (state:any, obj:LoginObj) {
      state.userId = obj ? obj.userId : null;
      state.userName = obj ? obj.userName : '';
      state.avatar = obj ? obj.avatar : '';
      state.name = obj ? obj.name : '';
      state.mobile = obj ? obj.mobile : '';
      state.email = obj ? obj.email : '';
      state.roleId = obj ? obj.roleId : null;
      state.classId = obj ? obj.classId : null;
      state.roleList = obj ? obj.roleList : null;
    }
  },
  actions: {
    SET_USERNAME (context:any, userName:string) {
      context.commit('SET_USERNAME', userName)
    },
    async LOGIN (context:any, loginObj:LoginObj) {
      context.commit('SET_USER_INFO', loginObj)
    },
    async LOGOUT(context:any) {
      context.commit('SET_USER_INFO', null)
    }
  }
}