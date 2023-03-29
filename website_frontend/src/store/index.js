import { createStore } from 'vuex'
import storage from '../utils/storage'

export default createStore({
    state: {
        client: 'pc',
        token: ''
    },
    getters: {
        getToken(state) {
            return state.token || storage.get("token") || "";
        }
    },
    mutations: {
        setWidth(state, val) {
            state.client = val
        },
        // 修改token，并将token存入localStorage
        setToken(state, token) {
            state.token = token;
            storage.set('token', token);
        },
        delToken(state) {
            state.token = "";
            storage.remove("token");
        },
    },
    actions: {
        set_width({ commit }, val) {
            commit('setWidth', val)
        }
    }
})