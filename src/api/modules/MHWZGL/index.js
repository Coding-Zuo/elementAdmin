import request from '@/api/request';
const MHWZGL_URL = window.global_config.MHWZGL_URL;

export const dropMenuList = params => {
    return request({
        url: `${MHWZGL_URL}`,
        method: 'get',
        params
    });
};
