// 接口统一集成模块
import * as SJGD from './modules/SJGD';
import * as SJCLGL from './modules/SJCLGL';
import * as SJWHGL from './modules/SJWHGL';
import * as GLYQXGL from './modules/GLYQXGL/index';
import * as MHWZGL from './modules/MHWZGL';
import * as WZYHQXGL from './modules/WZYHQXGL';

// 默认全部导出
export default {
    SJCLGL,
    SJWHGL,
    GLYQXGL,
    MHWZGL,
    SJGD,
    WZYHQXGL
};
