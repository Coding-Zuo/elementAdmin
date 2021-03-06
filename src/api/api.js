// 接口统一集成模块
import * as SJGD from './modules/SJGD';
import * as SJCLGL from './modules/SJCLGL/index';
import * as QIANYI_SHENGMING from './modules/SJCLGL/qianyihuijiao';
import * as SJWHGL from './modules/SJWHGL/';
import * as GLYQXGL from './modules/GLYQXGL/index';
import * as MHWZGL from './modules/MHWZGL';
import * as WZYHQXGL from './modules/WZYHQXGL';
import * as LOGIN from './modules/LOGIN';
import * as QXYZMK from './modules/QXYZMK';
import * as XTSY from './modules/XTSY';

// 默认全部导出
export default {
    WZYHQXGL,
    SJCLGL,
    QIANYI_SHENGMING,
    SJWHGL,
    GLYQXGL,
    MHWZGL,
    SJGD,
    LOGIN,
    QXYZMK,
    XTSY
};
