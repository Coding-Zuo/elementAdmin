import request from '@/api/request';
//该页面所有的下拉菜单
export const dropMenuList = params => {
    return request({
        url: '',
        method: 'get',
        params
    });
};
//搜素搜索
export const queryData = params => {
    return request({
        url: 'sjgl/sjwhgl/queryData',
        method: 'get',
        params
    });
};
//人工数据迁移
export const dataMigrate = params => {
    return request({
        url: 'sjgl/sjwhgl/dataMigrate',
        method: 'post',
        params
    });
};
//人工数据清理
export const dataDelete = params => {
    return request({
        url: 'sjgl/sjwhgl/dataDelete',
        method: 'post',
        params
    });
};
