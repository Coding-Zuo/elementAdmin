// 网站用户权限管理
import request from '@/api/request'
const WZYHQXGL_URL = window.global_config.WZYHQXGL_URL

/**
 *  数据操作权限管理
 */
// 提供所有数据操作权限展示使用
export const getDataOpPrivilege = () => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/getDataOpPrivilege`,
        method: 'get'
    })
}

// ------- 数据查询权限等级（开放等级）------------
// 查询开放等级
export const querySearchLevel = (searchLevel = '') => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/querySearchLevel?searchLevel=${searchLevel}`,
        method: 'get'
    })
}

// 新增开放等级
export const insertSearchLevel = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/insertSearchLevel`,
        method: 'post',
        data
    })
}

// 删除开放等级
export const deleteSearchLevel = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/deleteSearchLevel`,
        method: 'post',
        data
    })
}

// 开放等级更新
export const updateSearchLevel = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/updateSearchLevel`,
        method: 'post',
        data
    })
}

// --------- 数据下载权限等级（共享等级）--------------
// 共享级别查询
export const queryShareLevel = (shareLevel = '') => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/queryShareLevel?shareLevel=${shareLevel}`,
        method: 'get'
    })
}

// 新增共享等级
export const insertShareLevel = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/insertShareLevel`,
        method: 'post',
        data
    })
}

// 删除共享等级
export const deleteShareLevel = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/deleteShareLevel`,
        method: 'post',
        data
    })
}

// 共享级别更新
export const updateShareLevel = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/updateShareLevel`,
        method: 'post',
        data
    })
}

// ------------- 数据订购权限（业务属性）-------------
// 业务属性查询
export const queryPurchaseType = (purchaseType = '') => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/queryPurchaseType?purchaseType=${purchaseType}`,
        method: 'get'
    })
}

// 业务属性新增
export const insertPurchaseType = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/insertPurchaseType`,
        method: 'post',
        data
    })
}

// 删除业务属性
export const deletePurchaseType = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/deletePurchaseType`,
        method: 'post',
        data
    })
}

// 业务属性更新
export const updatePurchaseType = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/updatePurchaseType`,
        method: 'post',
        data
    })
}

/**
 * 角色管理（一般管理员页面）
 */
// 角色信息查询
export const queryRole = (params) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/queryRole`,
        method:'get',
        params
    })
}

// 角色信息新增
export const insertRole = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/insertRole`,
        method: 'post',
        data
    })
}

// 角色信息修改
export const updateRole = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/updateRole`,
        method: 'post',
        data
    })
}

// 删除角色信息（批量删除和单行删除调用的接口一样，只是传的参数个数不同）
export const deleteRole = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/deleteRole`,
        method: 'post',
        data
    })
}

// 用户数据操作权限查询，其中返回结果标红字段 为多个，以“ ”拼接
export const queryDataOpPrivilege = (roleId) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/queryDataOpPrivilege?roleTd=${roleId}`,
        method: 'get'
    })
}

// 用户数据操作权限保存，参数标红字段有多个以“ ”拼接
export const saveDataOpPrivilege = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/saveDataOpPrivilege`,
        method: 'post',
        data
    })
}

// 用户功能权限查询
export const queryFuncPrivilege = (roleId) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/queryFuncPrivilege?roleId=${roleId}`,
        method: 'get'
    })
}

// 用户功能权限保存
export const saveFuncPrivilege = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/saveFuncPrivilege`,
        method: 'post',
        data
    })
}

/**
 * 用户角色配置（一般管理员页面）
 */
// 用户信息查询
export const queryUserInfo = (params) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/queryUserInfo?`,
        method: 'get',
        params
    })
}

// 角色信息保存，参数标红字段为多个以空格拼接
export const saveUserRole = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/saveUserRole`,
        method: 'post',
        data
    })
}

// 根据角色名称获取数据操作权限对应的卫星范围和功能权限
export const queryUserPrivilege = (roleName) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/queryUserPrivilege?roleName=${roleName}`,
        method: 'get'
    })
}

// 用户启用禁用功能
export const updateUserRole = (data) => {
    return request({
        url: `${WZYHQXGL_URL}/wzyhqxgl/updateUserRole`,
        method: 'post',
        data
    })
}
