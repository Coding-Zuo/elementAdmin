// 数据归档
import request from '@/api/request';
const SJGD_URL = window.global_config.SJGD_URL;
/* 已完成、在执行、待处理 页面 */
//任务列表
export const queryJobList = params => {
    return request({
        url: `${SJGD_URL}zygdfw/queryJobList`,
        method: 'get',
        params
    });
};
//日志查询
export const queryJobLogList = params => {
    return request({
        url: `${SJGD_URL}zygdfw/queryJobLogList`,
        method: 'get',
        params
    });
};
/* 资源信息配置页面 */
export const queryZYPZXXList = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/queryZYPZXXList`,
        method: 'get',
        params
    });
};
