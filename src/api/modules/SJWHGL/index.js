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
        method: 'post',
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
/* 数据回收站 */
//数据查询
export const queryRecycleData = params => {
    return request({
        url: 'sjgl/sjhsz/queryRecycleData',
        method: 'get',
        params
    });
};
// 详情查看
export const queryRecycleDataDetails = params => {
    return request({
        url: 'sjgl/sjhsz/queryRecycleDataDetails',
        method: 'get',
        params
    });
};
//数据恢复
export const recoveryRecycleData = params => {
    return request({
        url: 'sjgl/sjhsz/recoveryRecycleData',
        method: 'get',
        params
    });
};
//删除
export const deleteRecycleData = params => {
    return request({
        url: 'sjgl/sjhsz/deleteRecycleData',
        method: 'post',
        params
    });
};
