//权限验证模块
import request from '@/api/request.js';
const GLYQXGL_URL = window.global_config.GLYQXGL_URL;

// 管理员功能操作权限认证
export const queryAdminFuncPrivilege = userName => {
    return request({
        url: `${GLYQXGL_URL}/sjqxrzgl/queryUserFuncPrivilege?userName=${userName}`,
        method: 'post'
    });
};

// 管理员数据操作权限认证接口
export const queryAdminDataOpPrivilege = params => {
    return request({
        url: `${GLYQXGL_URL}/sjqxrzgl/queryAdminDataOpPrivilege`,
        method: 'get',
        params
    });
};

// 网站用户功能操作权限认证
export const queryUserFuncPrivilege = userName => {
    return request({
        url: `${GLYQXGL_URL}/sjqxrzgl/queryUserFuncPrivilege?userName=${userName}`,
        method: 'post'
    });
};

// 网站用户数据操作权限认证接口
export const queryUserDataOpPrivilege = params => {
    return request({
        url: `${GLYQXGL_URL}/sjqxrzgl/queryUserDataOpPrivilege`,
        method: 'get',
        params
    });
};
