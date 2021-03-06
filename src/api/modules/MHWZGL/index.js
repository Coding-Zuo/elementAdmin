import request from '@/api/request';
const MHWZGL_URL = window.global_config.MHWZGL_URL;

/// ================= 新闻动态发布 ======================
// 门户新闻保存
export const saveXw = data => {
    return request({
        url: `${MHWZGL_URL}/mh/saveXw`,
        method: 'post',
        data
    });
};

// 删除新闻
export const delXw = xh => {
    return request({
        url: `${MHWZGL_URL}/mh/delXw?xh=${xh}`,
        method: 'post'
    });
};

// 新闻详情
export const quertXw = xh => {
    return request({
        url: `${MHWZGL_URL}/mh/quertXw?xh=${xh}`,
        method: 'get'
    });
};

// 编辑新闻
export const editXw = data => {
    return request({
        url: `${MHWZGL_URL}/mh/editXw`,
        method: 'post',
        data
    });
};

// 新闻分页查询
export const quertXwList = params => {
    return request({
        url: `${MHWZGL_URL}/mh/quertXwList`,
        method: 'get',
        params
    });
};

/// ===================== 通知公告管理 ================================
// 保存通知公告
export const saveTzgg = data => {
    return request({
        url: `${MHWZGL_URL}/mh/saveTzgg`,
        method: 'post',
        data
    });
};
// 删除通知公告
export const delTzgg = xh => {
    return request({
        url: `${MHWZGL_URL}/mh/delTzgg?xh=${xh}`,
        method: 'post'
    });
};
// 通知公告详情
export const quertTzgg = xh => {
    return request({
        url: `${MHWZGL_URL}/mh/quertTzgg?xh=${xh}`,
        method: 'get'
    });
};
// 编辑通知公告
export const editTzgg = data => {
    return request({
        url: `${MHWZGL_URL}/mh/editTzgg`,
        method: 'post',
        data
    });
};
// 通知公告分页查询
export const quertTzggList = params => {
    return request({
        url: `${MHWZGL_URL}/mh/quertTzggList`,
        method: 'get',
        params
    });
};

/// ======================== 卫星介绍发布 ================================
// 保存卫星
export const saveWx = data => {
    return request({
        url: `${MHWZGL_URL}/mh/saveWx`,
        method: 'post',
        data
    });
};
// 删除卫星
export const delWx = xh => {
    return request({
        url: `${MHWZGL_URL}/mh/delWx?id=${xh}`,
        method: 'post'
    });
};
// 卫星详情
export const quertWx = xh => {
    return request({
        url: `${MHWZGL_URL}/mh/quertWx?id=${xh}`,
        method: 'get'
    });
};
// 编辑卫星
export const editWx = data => {
    return request({
        url: `${MHWZGL_URL}/mh/editWx`,
        method: 'post',
        data
    });
};
// 卫星分页查询
export const quertWxList = params => {
    return request({
        url: `${MHWZGL_URL}/mh/quertWxList`,
        method: 'get',
        params
    });
};

// ========================== 轮播图管理 ==========================
// 1.4轮播图设置保存接口saveLbt
export const saveLbt = data => {
    return request({
        url: `${MHWZGL_URL}/mh/saveLbt`,
        method: 'post',
        data
    });
};
// 1.5轮播图删除接口delLbt
export const delLbt = xh => {
    return request({
        url: `${MHWZGL_URL}/mh/delLbt?xh=${xh}`,
        method: 'post'
    });
};
// 1.6轮播图详情查看接口quertLbt
export const quertLbt = xh => {
    return request({
        url: `${MHWZGL_URL}/mh/quertLbt?xh=${xh}`,
        method: 'get'
    });
};
// 1.7轮播图配置编辑接口editLbt
export const editLbt = data => {
    return request({
        url: `${MHWZGL_URL}/mh/editLbt`,
        method: 'post',
        data
    });
};
// 1.8轮播图分页查询接口quertLbtList
export const quertLbtList = params => {
    return request({
        url: `${MHWZGL_URL}/mh/quertLbtList`,
        method: 'get',
        params
    });
};

/// ========================= 影像展厅管理、影像管理 ============================
// 保存影像展厅
export const saveYxzt = data => {
    return request({
        url: `${MHWZGL_URL}/mh/saveYxzt`,
        method: 'post',
        data
    });
};

// 删除影像展厅
export const delYxzt = ids => {
    return request({
        url: `${MHWZGL_URL}/mh/delYxzt?id=${ids}`,
        method: 'post'
    });
};

// 影像展厅详情
export const quertYxzt = id => {
    return request({
        url: `${MHWZGL_URL}/mh/quertYxzt?id=${id}`,
        method: 'get'
    });
};

// 编辑影像展厅
export const editYxzt = data => {
    return request({
        url: `${MHWZGL_URL}/mh/editYxzt`,
        method: 'post',
        data
    });
};

// 影像展厅分页查询
export const quertYxztList = params => {
    return request({
        url: `${MHWZGL_URL}/mh/quertYxztList`,
        method: 'get',
        params
    });
};

// 查询全部影像展厅
export const quertAllYxzt = () => {
    return request({
        url: `${MHWZGL_URL}/mh/quertAllYxzt`,
        method: 'get'
    });
};

// 查询全部影像展厅和图片
export const quertAllYxztAndYxztTp = () => {
    return request({
        url: `${MHWZGL_URL}/mh/quertAllYxztAndYxztTp`,
        method: 'get'
    });
};

// 保存影像展厅图片
export const saveYxztTp = data => {
    return request({
        url: `${MHWZGL_URL}/mh/saveYxztTp`,
        method: 'post',
        data
    });
};

// 删除影像展厅图片
export const delYxztTp = ids => {
    return request({
        url: `${MHWZGL_URL}/mh/delYxztTp?id=${ids}`,
        method: 'post'
    });
};

// 影像展厅图片详情
export const quertYxztTp = id => {
    return request({
        url: `${MHWZGL_URL}/mh/quertYxztTp?id=${id}`,
        method: 'get'
    });
};

// 编辑影像展厅图片
export const editYxztTp = data => {
    return request({
        url: `${MHWZGL_URL}/mh/editYxztTp`,
        method: 'post',
        data
    });
};

// 影像展厅图片分页查询
export const quertYxztTpList = params => {
    return request({
        url: `${MHWZGL_URL}/mh/quertYxztTpList`,
        method: 'get',
        params
    });
};
