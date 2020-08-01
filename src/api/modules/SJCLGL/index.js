import request from '@/api/request';
const SJCLGL_URL = window.global_config.SJCLGL_URL;
/* 数据流转服务策略管理 */
/* 数据汇交策略管理 */
// 查询数据汇交策略
export const querySjhjcl = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/querySjhjcl`,
        method: 'get',
        params
    });
};
// 添加数据汇交策略
export const insertSJHJCL = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/insertSJHJCL`,
        method: 'post',
        params
    });
};
//删除数据汇交策略
export const deleteSjhjcl = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/deleteSjhjcl`,
        method: 'get',
        params
    });
};
//编辑数据汇交策略
export const editSjhjcl = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/editSjhjcl`,
        method: 'post',
        params
    });
};
//停用启用数据汇交策略
export const updateSjhjcl = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/updateSjhjcl`,
        method: 'post',
        params
    });
};
//接收地址管理单条数据详情
export const querySjhjjsdz = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/querySjhjjsdz`,
        method: 'get',
        params
    });
};
//接收地址管理列表添加
export const insertSJHJJSDZ = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/insertSJHJJSDZ`,
        method: 'post',
        params
    });
};
//接收地址管理列表删除
export const deleteSjhjjsdz = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/deleteSjhjjsdz`,
        method: 'post',
        params
    });
};
//接收地址管理列表修改
export const editSjhjjsdz = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/editSjhjjsdz`,
        method: 'post',
        params
    });
};

/* 数据迁移策略管理 */
export const queryMigrationStrategyInfo = params => {
    return request({
        url: `${SJCLGL_URL}sjgl/sjqygl/queryMigrationStrategyInfo`,
        method: 'get',
        params
    });
};
/* 数据迁生命周期策略管理 */
// 搜索

//添加

//编辑

//删除

//应用应用状态

// 详情

// 上方搜索条件应用状态
