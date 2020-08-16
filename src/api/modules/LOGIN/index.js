// 登录相关
import request from '@/api/request.js';
const GLYQXGL_URL = window.global_config.GLYQXGL_URL;

// 用户登录
export const login = data => {
    return request({
        url: `${GLYQXGL_URL}/yhdl/login`,
        method: 'post',
        data
    });
};
