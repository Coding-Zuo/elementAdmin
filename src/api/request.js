import axios from 'axios';
import { Notification, MessageBox, Message } from 'element-ui';
import store from '@/store';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// 创建axios实例
const service = axios.create({
    //   axios中请求配置有baseURL选项，表示请求URL公共部分
    //   baseURL: window.global_config.BASE_URL,
    // 是否携带请求头
    //   withCredentials: true,
    // 超时
    timeout: 10000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        //   console.log(config)
        // 暂时不做处理
        // if (store.getters.token) {
        //   config.headers['Authorization'] = 'Bearer ' + store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
        // }
        return config;
    },
    error => {
        console.log(88888888888888888, error);
        Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(res => {
    console.log(res);
    // const code = res.data.code
    // if (code === 401) {
    //   MessageBox.confirm(
    //     '登录状态已过期，您可以继续留在该页面，或者重新登录',
    //     '系统提示',
    //     {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   ).then(() => {
    //     store.dispatch('LogOut').then(() => {
    //       location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //   })
    // } else
    // if (code !== 200) {
    //   Notification.error({
    //     title: res.data.msg
    //   })
    //   return Promise.reject('error')
    // } else {
    return res.data;
    // }
});

export default service;
