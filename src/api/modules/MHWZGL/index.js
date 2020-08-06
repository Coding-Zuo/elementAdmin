import request from '@/api/request';
const MHWZGL_URL = window.global_config.MHWZGL_URL;

/// 新闻动态发布
// 门户新闻保存
export const saveXw = (data) => {
    return request({
        url: `${MHWZGL_URL}/mh/saveXw`,
        method: 'post',
        data
    })
}

// 删除新闻
export const delXw = (xh) => {
    return request({
        url: `${MHWZGL_URL}/mh/delXw?xh=${xh}`,
        method: 'get'
    })
}

// 新闻详情
export const quertXw = (xh) => {
    return request({
        url: `${MHWZGL_URL}/mh/quertXw?xh=${xh}`,
        method: 'get'
    })
}

// 编辑新闻
export const editXw = (data) => {
    return request({
        url: `${MHWZGL_URL}/mh/editXw`,
        method: 'post',
        data
    })
}

// 新闻分页查询
export const quertXwList = (params) => {
    return request({
        url: `${MHWZGL_URL}/mh/quertXwList`,
        method: 'get',
        params
    })
}

/// 通知公告管理










