import Vue from 'vue';
import Vuex from 'vuex';
import store from '..';

Vue.use(Vuex);

const dataStore = new Vuex.Store({
    state: {},
    mutations: {
        // functionname(params) {}
    },
    actions: {},
    modules: {}
});
export default {
    dataStore
};
