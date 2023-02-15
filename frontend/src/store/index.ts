import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import user from "@/store/modules/user"
import system from "@/store/modules/system"
import { getRoutes } from '@/router';

// 使用了Module的格式：ModuleName.xxxx，这里持久化的是Theme Module下面的persistData数据
const PERSIST_PATHS = ['user', 'system']

 const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    system
  },
   plugins: [createPersistedState({paths: PERSIST_PATHS})]
})
// 添加路由树
  getRoutes(store);
  
export default store