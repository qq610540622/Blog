/**
 * Created by Administrator on 2016-02-25.
 */


var commonHelper = {};


/**
 * 生成随机数
 * @param min
 * @param max
 * @returns {*}
 */
commonHelper.random = function(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * 生成验证码
 * @param width
 * @param height
 * @returns {Buffer}
 */
commonHelper.captcha = function(width,height,code) {
    var captchapng = require('captchapng');
    var p = new captchapng(width,height, code);
    p.color(0, 0, 0, 80);
    p.color(20, 20, 20, 255);

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    return imgbase64;
}


/**
 * md5加密
 * @param str
 * @returns {*}
 */
commonHelper.md5 = function(str) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(str).digest('hex');
}


module.exports = commonHelper;
