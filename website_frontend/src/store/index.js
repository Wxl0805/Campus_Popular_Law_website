import { createStore } from 'vuex'

export default createStore({
  state: {
    client: 'pc'
  },
  mutations: {
    setWidth(state,val){
      state.client=val
      console.log(val,'val');
    }
  },
  actions: {
    set_width({commit},val){
      commit('setWidth',val)
    }
  }
})
