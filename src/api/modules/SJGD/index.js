// 数据归档
import request from '@/api/request';

// 保存数据归档
export const insertZYPZXX = params => {
    return request({
        url: 'zyxxpz/insertZYPZXX',
        method: 'post',
        params
    });
};
export const queryJobList = params => {
    return request({
        url: 'zygdfw/queryJobList',
        method: 'get',
        params
    });
};
//zygdfw/queryJobList
