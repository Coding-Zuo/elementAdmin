// 数据归档
import request from '@/api/request';
const SJCLGL_URL = window.global_config.SJCLGL_URL;

// 搜索
export const queryMigrationStrategyInfo = params => {
    return request({
        url: `${SJCLGL_URL}sjgl/sjqygl/queryMigrationStrategyInfo`,
        method: 'get',
        params
    });
};
//添加

//编辑

//删除

//应用应用状态

// 详情

// 上方搜索条件应用状态
