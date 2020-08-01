import request from '@/api/request';
const WZYHQXGL_URL = window.global_config.WZYHQXGL_URL;

export const dropMenuList = params => {
    return request({
        url: `${WZYHQXGL_URL}`,
        method: 'get',
        params
    });
};
