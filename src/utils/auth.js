import { Message } from 'element-ui';
/**
 * 权限服务
 */

// 权限--接口返回值处理
export function qxResultHandle(res, callBack) {
    switch (res.code) {
        case '1':
            if (res.msg == 'OK') {
                callBack(res);
            } else {
                Message.error(res.msg);
            }
            break;
        case '0':
            Message.error('权限服务异常！错误码：' + res.code);
            break;
        default:
            Message.error('其他错误！错误码：' + res.code);
            break;
    }
}

// 门户网站管理--接口返回值处理
export function mhwzglResultHandle(res, callBack) {
    switch (res.code) {
        case 200:
            callBack(res);
            break;
        case 500:
            Message.error('操作出错！');
            break;
        default:
            Message.error('其他错误！错误码：' + res.code);
            break;
    }
}

// 数据归档--接口返回值处理
export function sjgdResultHandle(res, callBack) {
    switch (res.code) {
        case 200:
            if (res.msg == 'OK') {
                callBack(res);
            } else {
                Message.error(res.msg);
            }
            break;
        default:
            Message.error('数据归档服务其他错误！错误码：' + res.code);
            break;
    }
}

// 数据策略管理--接口返回值处理
export function sjclglResultHandle(res, callBack) {
    switch (res.code) {
        case '1':
            if (res.msg == 'OK') {
                callBack(res);
            } else {
                Message.error(res.msg);
            }
            break;
        case '0':
            Message.error(res.msg);
            break;
        default:
            Message.error('其他错误！错误码：' + res.code);
            break;
    }
}
