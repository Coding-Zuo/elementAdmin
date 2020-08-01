import request from '@/api/request';
const GLYQXGL_URL = window.global_config.GLYQXGL_URL;

export const dropMenuList = params => {
    return request({
        url: `${GLYQXGL_URL}`,
        method: 'get',
        params
    });
};
