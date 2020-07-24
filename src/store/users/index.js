import Vue from 'vue';
import Vuex from 'vuex';
import store from '..';

Vue.use(Vuex);

const userStore = new Vuex.Store({
    state: {
        roleName: admin,
        roleId: 000000
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
