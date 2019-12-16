/**
 * 错误提示
 * @param msg  提示信息
 * @param code 错误编码
 * @returns {{code: number, sub_code: string, msg: string, sub_msg: string}}
 */
function jsonError(msg = '', code = 402) {
    let sub_code = '';
    let sub_msg = '';
    switch (code) {
        case 404:
            sub_code = 'warn.invalid-request';
            sub_msg = '非法请求!';
            break;
        case 403:
            sub_code = '';
            sub_msg = '';
            break;
        case 402:
            sub_code = 'warn.invalid-parameter';
            sub_msg = '参数无效';
            break;
        case 401:
            sub_code = 'warn.missing-necessary-parameters';
            sub_msg = '缺失必要参数!';
            break;
        default :
            sub_code = 'caution.network-busy';
            sub_msg = '网络繁忙,稍后再试!';
            break;
    }
    return {
        "code": code,
        "sub_code" : sub_code,
        "msg": msg ? msg : sub_msg,
    };
}

/**
 * 成功时返回的数据格式
 * @param data
 * @param msg
 * @returns {{msg: *, code: number, response: *}}
 */
function jsonSuccess(data = {}, msg = 'success') {
    return {
        "code": 0,
        "msg": msg,
        "response": data
    };
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getNowTimestamp() {
    var moment = require('moment');
    return moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
}

function getTime() {
    var moment = require('moment');
    return moment().unix();
}

module.exports = {
    jsonSuccess,
    jsonError,
    getNowTimestamp,
    getTime
};
