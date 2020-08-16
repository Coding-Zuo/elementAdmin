// 管理员权限管理
import request from '@/api/request';
const HOME_URL = window.global_config.HOME_URL;

/**
 *  系统首页
 */
//用户统计
export const queryUserRole = params => {
    return request({
        url: `${HOME_URL}tjsj/queryUserRole`,
        method: 'get',
    });
};
//最近N小时卫星数据统计
export const querySjHourzl = params => {
    return request({
        url: `${HOME_URL}tjsj/querySjHourzl`,
        method: 'get',
        params,
    });
};
//卫星历史数据统计
export const querySjzl = params => {
    return request({
        url: `${HOME_URL}tjsj/querySjzl`,
        method: 'get',
        params,
    });
};
