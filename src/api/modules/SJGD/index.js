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
//数据列表、查询
export const queryZYPZXXList = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/queryZYPZXXList`,
        method: 'get',
        params
    });
};
//添加配置信息
export const insertZYPZXX = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/insertZYPZXX`,
        method: 'post',
        params
    });
};
//添加XML配置信息
export const insertXMLPzxx = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/insertXMLPzxx`,
        method: 'post',
        params
    });
};
//编辑XML配置信息
export const editXmlPzxx = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/editXmlPzxx`,
        method: 'post',
        params
    });
};
//批量添加XML信息配置
export const insertXmlpzxxList = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/insertXmlpzxxList`,
        method: 'post',
        params
    });
};
//批量添加文件夹信息配置
export const insertWjjPzxxList = params => {
    return request({
        url: `${SJGD_URL}yxxpz/insertWjjPzxxList`,
        method: 'post',
        params
    });
};
//根据元信息名称查询对应的xml配置资源信息
export const queryXmlPzxxList = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/queryXmlPzxxList`,
        method: 'post',
        params
    });
};
//根据元信息名称和配置类型查询配置信息集合及状态
export const queryPzzt = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/queryPzzt`,
        method: 'post',
        params
    });
};
//删除资源配置信息
export const deleteZYPZXX = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/deleteZYPZXX`,
        method: 'post',
        params
    });
};
//根据主键查询单条资源配置
export const selectZYPZXXByxh = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/selectZYPZXXByxh`,
        method: 'post',
        params
    });
};
//上传XML文档到后台解析
export const dealWithXml = data => {
    return request({
        url: `${SJGD_URL}zyxxpz/dealWithXml`,
        method: 'post',
        data
    });
};
//资源配置信息修改
export const editZYPZXX = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/editZYPZXX`,
        method: 'post',
        params
    });
};
//获取所有数据据库表
export const getSjkb = params => {
    return request({
        url: `${SJGD_URL}zyxxpz/getSjkb`,
        method: 'post',
        params
    });
};
