// 管理员权限管理
import request from '@/api/request';
const GLYQXGL_URL = window.global_config.GLYQXGL_URL;

/**
 *  数据操作权限管理
 */
// 提供所有数据操作权限展示使用
export const getDataOpPrivilege = () => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/getDataOpPrivilege`,
        method: 'get'
    })
}

// ------- 数据查询权限等级（开放等级）------------
// 查询开放等级
export const querySearchLevel = (searchLevel) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/querySearchLevel?searchLevel=${searchLevel}`,
        method: 'get'
    })
}

// 新增开放等级
export const insertSearchLevel = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/insertSearchLevel`,
        method: 'post',
        data
    })
}

// 删除开发等级
export const deleteSearchLevel = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/deleteSearchLevel`,
        method: 'post',
        data
    })
}

// 开放等级更新
export const updateSearchLevel = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/updateSearchLevel`,
        method: 'post',
        data
    })
}

// --------- 数据下载权限等级（共享等级）--------------
// 共享级别查询
export const queryShareLevel = (shareLevel) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/queryShareLevel?shareLevel=${shareLevel}`,
        method: 'get'
    })
}

// 新增共享等级
export const insertShareLevel = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/insertShareLevel`,
        method: 'post',
        data
    })
}

// 删除共享等级
export const deleteShareLevel = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/deleteShareLevel`,
        method: 'post',
        data
    })
}

// 共享级别更新
export const updateShareLevel = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/updateShareLevel`,
        method: 'post',
        data
    })
}

// ------------- 数据订购权限（业务属性）-------------
// 业务属性查询
export const queryPurchaseType = (purchaseType) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/queryPurchaseType?purchaseType=${purchaseType}`,
        method: 'get'
    })
}

// 业务属性新增
export const insertPurchaseType = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/insertPurchaseType`,
        method: 'post',
        data
    })
}

// 删除业务属性
export const deletePurchaseType = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/deletePurchaseType`,
        method: 'post',
        data
    })
}

// 业务属性更新
export const updatePurchaseType = (data) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/updatePurchaseType`,
        method: 'post',
        data
    })
}

/**
 * 数据默认业务属性管理（超级管理员页面）
 */
// 数据默认业务属性查询
export const queryBusinessProperty = (params) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/queryBusinessProperty`,
        method: 'get',
        params
    })
}

// 数据默认业务属性进行新增\修改 (当参数id存在为修改)
export const saveBusinessProperty = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/saveBusinessProperty`,
        method: 'post',
        data
    })
}

/**
 * 数据集合管理（超级管理员页面）
 */
// 数据集合查询
export const queryDataSet = (params) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/queryDataSet?`,
        method: 'get',
        params
    })
}

// 数据集合删除
export const deleteDataSet = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/deleteDataSet`,
        method: 'post',
        data
    })
}

// 获取卫星列表
export const querySatelliteName = (satelliteName) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/querySatelliteName?satelliteName=${satelliteName}`,
        method: 'get'
    })
}

// 数据集合新增
export const insertDataSet = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/insertDataSet`,
        method: 'post',
        data
    })
}

// 产品类型查询
export const queryProductType = () => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/queryProductType`,
        method: 'get'
    })
}

// 数据集合信息修改
export const updateDataSet = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/updateDataSet`,
        method: 'post',
        data
    })
}

/**
 * 管理员管辖数据范围配置（超级管理员页面）
 */
// 根据用户Id获取对应的管辖卫星列表
export const querySatelliteNameByUserId = (adminId) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/querySatelliteNameByUserId?adminId=${adminId}`,
        method: 'get'
    })
}

// 管辖数据范围保存
export const saveAdminDataRange = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/saveAdminDataRange`,
        method: 'post',
        data
    })
}

/**
 * 角色管理（超级管理员页面）
 */
// 角色信息查询
export const queryRole = (params) => {
    return request({
        url: `${GLYQXGL_URL}/wzyhqxgl/queryRole`,
        method:'get',
        params
    })
}

// 角色信息新增
export const insertRole = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/insertRole`,
        method: 'post',
        data
    })
}

// 角色信息修改
export const updateRole = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/updateRole`,
        method: 'post',
        data
    })
}

// 删除角色信息（批量删除和单行删除调用的接口一样，只是传的参数个数不同）
export const deleteRole = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/deleteRole`,
        method: 'post',
        data
    })
}

// 根据角色获取数据操作权限对应的卫星范围，标红字段返回结果为多个以“ ”拼接
export const queryDataOpPrivilege = (roleId) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/queryDataOpPrivilege?roleTd=${roleId}`,
        method: 'get'
    })
}

// 数据操作权限保存，参数标红字段有多个以“ ”拼接
export const saveDataOpPrivilege = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/saveDataOpPrivilege`,
        method: 'post',
        data
    })
}

// 根据角色获取功能操作权限
export const queryFuncPrivilege = (roleId) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/queryFuncPrivilege?roleId=${roleId}`,
        method: 'get'
    })
}

// 功能操作权限保存
export const saveFuncPrivilege = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/saveFuncPrivilege`,
        method: 'post',
        data
    })
}

/**
 * 用户角色配置（超级管理员页面）
 */
// 用户信息查询
export const queryAdminInfo = (userName) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/queryAdminInfo?userName=${userName}`,
        method: 'get'
    })
}

// 角色信息保存
export const saveAdminRole = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/saveAdminRole`,
        method: 'post',
        data
    })
}

// 根据角色名称获取数据操作权限对应的卫星范围和功能权限
export const queryAdminPrivilege = (roleName) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/queryAdminPrivilege?roleName=${roleName}`,
        method: 'get'
    })
}

// 用户启用禁用功能
export const updateUserRole = (data) => {
    return request({
        url: `${GLYQXGL_URL}/glyqxgl/updateUserRole`,
        method: 'post',
        data
    })
}
