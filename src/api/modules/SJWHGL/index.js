import request from '@/api/request';
/* 数据查询维护页面 */
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
/* 存储区维护页面 */
//查询
export const queryStoreInf = params => {
    return request({
        url: 'sjgl/sjccqgl/queryStoreInf',
        method: 'get',
        params
    });
};
//删除
export const deleteStoreInfo = params => {
    return request({
        url: 'sjgl/sjccqgl/deleteStoreInfo',
        method: 'get',
        params
    });
};
//修改
export const updateStoreInfo = params => {
    return request({
        url: 'sjgl/sjccqgl/updateStoreInfo',
        method: 'post',
        params
    });
};
//添加
export const addStoreInfo = params => {
    return request({
        url: 'sjgl/sjccqgl/addStoreInfo',
        method: 'post',
        params
    });
};
