// 数据归档
import request from '@/api/request';

// 新增数据归档
export const insertZYPZXX = params => {
    return request({
        url: 'zyxxpz/insertZYPZXX',
        method: 'post',
        params
    });
};
//数据列表
export const queryJobList = params => {
    return request({
        url: 'zyxxpz/queryZYPZXXList',
        method: 'get',
        params
    });
};
//日志查询
export const queryJobLogList = params => {
    return request({
        url: 'zygdfw/queryJobLogList',
        method: 'get',
        params
    });
};
//zyxxpz/editXmlPzxx
export const editXmlPzxx = params => {
    return request({
        url: 'zyxxpz/editXmlPzxx',
        method: 'post',
        params
    });
};
// zygdfw / queryJobList;
