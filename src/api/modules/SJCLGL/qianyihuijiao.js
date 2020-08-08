import request from '@/api/request';
const QIANYI_SHENGMING_URL = window.global_config.QIANYI_SHENGMING_URL;

// /* *************************************数据汇交策略管理********************************** */
// // 查询数据汇交策略
// export const querySjhjcl = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/querySjhjcl`,
//         method: 'get',
//         params
//     });
// };
// // 添加数据汇交策略
// export const insertSJHJCL = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/insertSJHJCL`,
//         method: 'post',
//         params
//     });
// };
// //删除数据汇交策略
// export const deleteSjhjcl = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/deleteSjhjcl`,
//         method: 'get',
//         params
//     });
// };
// //编辑数据汇交策略
// export const editSjhjcl = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/editSjhjcl`,
//         method: 'post',
//         params
//     });
// };
// //停用启用数据汇交策略
// export const updateSjhjcl = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/updateSjhjcl`,
//         method: 'post',
//         params
//     });
// };
// //接收地址管理单条数据详情
// export const querySjjsdzDetails = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjlzfw/querySjjsdzDetails`,
//         method: 'get',
//         params
//     });
// };
// //数据汇交接收地址单条查询接口
// export const querySjhjjsdzDetails = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/querySjhjjsdzDetails`,
//         method: 'get',
//         params
//     });
// };
// //接收汇交地址管理列表删除
// export const deleteSjhjjsdz = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/deleteSjhjjsdz`,
//         method: 'post',
//         params
//     });
// };
// //接收汇交地址管理列表添加
// export const insertSJHJJSDZ = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/insertSJHJJSDZ`,
//         method: 'post',
//         params
//     });
// };
// //接收汇交地址管理列表修改
// export const editSjhjjsdz = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/editSjhjjsdz`,
//         method: 'post',
//         params
//     });
// };
// /*数据汇交策略地址管理*/
// export const querySjhjjsdz = params => {
//     return request({
//         url: `${QIANYI_SHENGMING_URL}sjhjgl/querySjhjjsdz`,
//         method: 'post',
//         params
//     });
// };
/* ********************************************数据迁移策略管理 *********************************/
// 2.1数据迁移策略信息插入
export const addMigrationStrategyInfo = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjqygl/addMigrationStrategyInfo`,
        method: 'post',
        params
    });
};

// 2.2数据迁移策略信息查询
export const queryMigrationStrategyInfo = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjqygl/queryMigrationStrategyInfo`,
        method: 'get',
        params
    });
};

// 2.3数据迁移策略使用状态信息更新
export const UpdateStrategyUseStatus_QY = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjqygl/UpdateStrategyUseStatus`,
        method: 'post',
        params
    });
};

// 2.4数据迁移策略信息更新
export const updateMigrationStrategyInfo = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjqygl/updateMigrationStrategyInfo`,
        method: 'post',
        params
    });
};
// 微信提供 删除接口 /sjgl/sjqygl/deleteMigrationStrategyInfo
export const deleteMigrationStrategyInfo = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjqygl/deleteMigrationStrategyInfo`,
        method: 'post',
        params
    });
};

// 微信提供 详情接口 /sjgl/sjqygl/getMigrationStrategyInfo
export const getMigrationStrategyDetail = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjqygl/getMigrationStrategyDetail`,
        method: 'get',
        params
    });
};

/*****************************  数据迁生命周期策略管理 ***********************************************/
// 3.1数据生命周期策略信息插入 addLifecycleStrategyInfo
export const addLifecycleStrategyInfo = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjsmzqgl/addLifecycleStrategyInfo`,
        method: 'post',
        params
    });
};

// 3.2数据生命周期策略信息查询 queryLifecycleStrategyInfo
export const queryLifecycleStrategyInfo = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjsmzqgl/queryLifecycleStrategyInfo`,
        method: 'get',
        params
    });
};

// 3.3数据生命周期策略使用状态信息更新 UpdateStrategyUseStatus  启用、停用
export const UpdateStrategyUseStatus_SMZQ = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}/sjgl/sjsmzqgl/UpdateStrategyUseStatus`,
        method: 'post',
        params
    });
};

// 3.4数据生命周期策略信息更新 updateLifecycleStrategyInfo 编辑
export const updateLifecycleStrategyInfo = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjsmzqgl/updateLifecycleStrategyInfo`,
        method: 'post',
        params
    });
};

// 3.5数据生命周期策略信息删除 deleteLifecycleStrategyInfo
export const deleteLifecycleStrategyInfo = params => {
    return request({
        url: `${QIANYI_SHENGMING_URL}sjgl/sjsmzqgl/deleteLifecycleStrategyInfo`,
        method: 'get',
        params
    });
};
