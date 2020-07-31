import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const userStore = new Vuex.Store({
    state: {
        roleName: 'admin',
        roleId: '000000',
        isLogin: true
    },
    mutations: {
        // functionname(params) {}
    },
    actions: {},
    modules: {}
});
export default {
    userStore
};
