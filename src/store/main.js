import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'
Vue.use(Vuex)

let common = {
    namespaced: true,
    actions: {
        setUser(context, user) {
            context.commit('SETUSER', user);
        }
    },

    mutations: {
        SETUSER(state, user) {
            state.user = user;
        }
    },

    state: {
        user: null,
    },

    getters: {
       
    },
}


export default new Vuex.Store({
    modules: {
        common: common,
    }
})