import request from '@/api/request';
const SJCLGL_URL = window.global_config.SJCLGL_URL;
/* 数据流转服务策略管理 */
//查询
export const querySjlzcl = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/querySjlzcl`,
        method: 'get',
        params
    });
};
//添加
export const insertSJLZFWCL = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/insertSJLZFWCL`,
        method: 'get',
        params
    });
};

//删除
export const deleteSjlzcl = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/deleteSjlzcl`,
        method: 'post',
        params
    });
}; //修改
export const editSjlzcl = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/editSjlzcl`,
        method: 'post',
        params
    });
};

//启用、停用
export const updateSjlzcl = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/updateSjlzcl`,
        method: 'post',
        params
    });
};
//策略单条数据详情
export const TODOxiangqing = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/TODO`, //@西安艾尚 前端  金岩宏 策略详情接口先参考 策略列表 接口吧，返回的参数是一样的，请求参数是id，访问路径先空着吧
        method: 'post',
        params
    });
};
//////删除数据流转地址
export const deleteSjlzjsdz = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/deleteSjlzjsdz`,
        method: 'post',
        params
    });
};
//////添加数据流转地址
export const insertSJLZFWJSDZ = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/insertSJLZFWJSDZ`,
        method: 'post',
        params
    });
};
//////修改数据流转地址
export const editSjlzjsdz = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/editSjlzjsdz`,
        method: 'post',
        params
    });
};
//////查询数据流转地址
export const querySjlzjsdz = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/querySjlzjsdz`,
        method: 'post',
        params
    });
};
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
export const querySJIzjsdzDetails = params => {
    return request({
        url: `${SJCLGL_URL}sjlzfw/querySjlzjsdzDetails`,
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
/*数据汇交策略管理*/
export const querySjhjjsdz = params => {
    return request({
        url: `${SJCLGL_URL}sjhjgl/querySjhjjsdz`,
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
