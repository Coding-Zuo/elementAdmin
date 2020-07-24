import Vue from 'vue';
import Vuex from 'vuex';
import dataStore from './data';
import userStore from './users';

Vue.use(Vuex);

export default {
    dataStore,
    userStore
};
